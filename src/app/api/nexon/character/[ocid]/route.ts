import { getCharacterDetail } from '@/utils/nexon/getCharacterDetail';
import { getCharacterSignatureList } from '@/utils/nexon/getCharacterList';
import { handleNexonApiError } from '@/utils/nexon/handleNexonApiError';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ocid: string }> },
) {
  try {
    const { ocid } = await params;
    const { token } = await request.json();

    if (!token || !/^[a-zA-Z0-9._-]+$/.test(token)) {
      return NextResponse.json(
        { message: '유효한 API 키를 입력해주세요.' },
        { status: 400 },
      );
    }

    const res = await getCharacterDetail(ocid, token);
    const response = await res.json();

    if (!res.ok) {
      return handleNexonApiError(response);
    }

    console.log(response);
    // DB upsert 작업 요청
    // const supabase = await createClient();
    // characters.forEach((character) => {
    //   supabase.from('characters').upsert({
    //     id: character.ocid,
    //     name: character.character_name,
    //     world: character.world_name,
    //     class: character.character_class,
    //     level: character.character_level,
    //   });
    // });

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
