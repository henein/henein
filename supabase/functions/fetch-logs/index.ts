import { createClient } from 'jsr:@supabase/supabase-js@2';

type LogType = Record<
  string,
  Array<{
    character_id: string;
    character_level: number;
    character_combat: number | null;
  }>
>;

// Supabase 클라이언트 생성
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  return await handlePostRequest(req);
});

// **GET 요청 핸들러**
async function handlePostRequest(req: Request) {
  try {
    const { data, error } = await supabase
      .schema('mamudae')
      .rpc('get_character_logs');
    if (error) throw new Error(error.message);

    // 데이터 변환 및 created_at 기준 그룹화
    const groupedLogs = data?.reduce((acc: any, cur: any) => {
      const createdAtKey = new Date(cur.created_at).toISOString();

      if (!acc[createdAtKey]) {
        acc[createdAtKey] = [];
      }

      acc[createdAtKey].push({
        character_id: cur.character_id,
        character_level: Number(cur.character_level),
        character_combat: Number(cur.character_combat),
      });

      return acc;
    }, {} as LogType);

    return new Response(JSON.stringify({ logs: groupedLogs }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
    });
  }
}
