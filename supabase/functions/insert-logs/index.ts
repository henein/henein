import { createClient } from "jsr:@supabase/supabase-js@2";

// Supabase 클라이언트 생성
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase 환경 변수가 설정되지 않았습니다.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// API 엔드포인트 리스트
const NEXON_API_ENDPOINTS = [
  "popularity",
  "stat",
  "hyper-stat",
  "propensity",
  // "ability",
  // "item-equipment",
  // "cashitem-equipment",
  "symbol-equipment",
  // "set-effect",
  // "beauty-equipment",
  // "android-equipment",
  // "pet-equipment",
  // "skill",
  // "link-skill",
  "vmatrix",
  "hexamatrix",
  "hexamatrix-stat",
  "dojang",
  "basic",
];

// HTTP 서버 실행
Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  return await handlePostRequest(req);
});

// **쿼리 파라미터 가져오기**
function getQueryParams(url: string, key: string): string {
  return new URL(url).searchParams.get(key) ?? "";
}

// **POST 요청 핸들러**
async function handlePostRequest(req: Request) {
  try {
    const token = getQueryParams(req.url, "token");
    if (!token) {
      return new Response("Missing token parameter", { status: 400 });
    }

    const { data: characters, error } = await supabase
      .schema("mamudae")
      .from("streamer_with_character")
      .select("*");

    if (error) throw new Error(error.message);

    const created_at = new Date().toISOString();

    for (const character of characters) {
      const ocid = await fetchOcid(character.name, token);
      if (!ocid) continue;

      const response = await fetchNexonApis(ocid, token);
      await postNexonData(created_at, character.id, response);
    }

    return new Response(JSON.stringify({ message: "success edge functions" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
}

// **OCID 조회 함수**
async function fetchOcid(
  nickname: string,
  token: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://open.api.nexon.com/maplestory/v1/id?character_name=${nickname}`,
      { headers: { "x-nxopen-api-key": token } },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch OCID: ${response.status}`);
    }

    const { ocid } = await response.json();
    return ocid;
  } catch (error) {
    console.error("Error fetching OCID:", error);
    return null;
  }
}

// **Nexon API 요청 함수**
async function fetchNexonApis(ocid: string, token: string) {
  const fetchPromises = NEXON_API_ENDPOINTS.map(async (endpoint) => {
    try {
      const response = await fetch(
        `https://open.api.nexon.com/maplestory/v1/character/${endpoint}?ocid=${ocid}`,
        { headers: { "x-nxopen-api-key": token } },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
      }

      return { endpoint, data: await response.json() };
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return { endpoint, data: null };
    }
  });

  const results = await Promise.all(fetchPromises);
  return Object.fromEntries(
    results.map(({ endpoint, data }) => [endpoint, data]),
  );
}

// **Nexon 데이터 Supabase에 저장**
async function postNexonData(
  created_at: string,
  character_id: string,
  response: any,
) {
  try {
    const { error } = await supabase
      .schema("mamudae")
      .from("logs")
      .insert({
        created_at,
        character_id,
        ...Object.fromEntries(
          NEXON_API_ENDPOINTS.map((
            key,
          ) => [key.replace("-", "_"), response[key]]),
        ),
      });

    if (error) console.error("Database Insert Error:", error);
  } catch (err) {
    console.error("Error saving data:", err);
  }
}
