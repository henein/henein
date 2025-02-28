import { createClient } from "jsr:@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

function getQueryParams(url: string, token: string) {
  const urlObj = new URL(url);
  const queryParams = urlObj.searchParams;
  const queryTokenParam = queryParams.get(token);

  return {
    token: queryTokenParam ?? "",
  };
}

async function fetchNexonApis(
  { ocid, token }: { ocid: string; token: string },
) {
  // API 엔드포인트 리스트
  const endpoints = [
    "popularity",
    "stat",
    "hyper-stat",
    "propensity",
    "ability",
    "item-equipment",
    "cashitem-equipment",
    "symbol-equipment",
    "set-effect",
    "beauty-equipment",
    "android-equipment",
    "pet-equipment",
    "skill",
    "link-skill",
    "vmatrix",
    "hexamatrix",
    "hexamatrix-stat",
    "dojang",
    "basic",
  ];

  // 모든 API 요청을 병렬 실행
  const fetchPromises = endpoints.map(async (endpoint) => {
    try {
      const response = await fetch(
        `https://open.api.nexon.com/maplestory/v1/character/${endpoint}?ocid=${ocid}`,
        {
          headers: {
            "x-nxopen-api-key": token,
          },
        },
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

  // 모든 요청이 완료될 때까지 대기
  const results = await Promise.all(fetchPromises);

  // 결과를 `{ 엔드포인트: 데이터 }` 형태로 변환
  return Object.fromEntries(
    results.map(({ endpoint, data }) => [endpoint, data]),
  );
}

async function postNexonData(
  created_at: string,
  character_id: string,
  response: any,
) {
  try {
    const { error } = await supabase.schema("mamudae").from("logs")
      .insert({
        created_at,
        character_id,
        "basic": response["basic"],
        "popularity": response["popularity"],
        "stat": response["stat"],
        "hyper_stat": response["hyper-stat"],
        "ability": response["ability"],
        "item_equipment": response["item-equipment"],
        "cashitem_equipment": response["cashitem-equipment"],
        "symbol_equipment": response["symbol-equipment"],
        "set_effect": response["set-effect"],
        "beauty_equipment": response["beauty-equipment"],
        "android_equipment": response["android-equipment"],
        "pet_equipment": response["pet-equipment"],
        "skill": response["skill"],
        "link_skill": response["link-skill"],
        "vmatrix": response["vmatrix"],
        "hexamatrix": response["hexamatrix"],
        "hexamatrix_stat": response["hexamatrix-stat"],
        "dojang": response["dojang"],
        "propensity": response["propensity"],
      });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

async function handlePostRequest(req: Request) {
  try {
    const { token } = getQueryParams(req.url, "token");

    const { data: characters, error } = await supabase
      .schema("mamudae")
      .from("streamer_with_character")
      .select("*");

    if (error) throw new Error(error.message);

    const created_at = new Date().toISOString();
    for (const character of characters) {
      const response = await fetchNexonApis({ ocid: character.ocid, token });
      await postNexonData(created_at, character.id, response);
    }

    return new Response(JSON.stringify({ message: "success edge functions" }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}

Deno.serve(async (req) => {
  const { method } = req;

  if (method === "POST") {
    return await handlePostRequest(req);
  }

  return new Response("Method not allowed", { status: 405 });
});
