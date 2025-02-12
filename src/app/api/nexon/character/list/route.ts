import { getCharacterSignatureList } from '@/utils/nexon/getCharacterList';
import { handleNexonApiError } from '@/utils/nexon/handleNexonApiError';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token || !/^[a-zA-Z0-9._-]+$/.test(token)) {
      return NextResponse.json(
        { message: '유효한 API 키를 입력해주세요.' },
        { status: 400 },
      );
    }

    const res = await getCharacterSignatureList(token);
    const response = await res.json();

    if (!res.ok) {
      return handleNexonApiError(response);
    }

    const characters = response.account_list
      .map((item: any) => item.character_list)
      .flat();

    // DB 작업 요청
    // const supabase = await createClient();
    // characters.forEach((character) => {
    //   supabase.from('characters').insert({
    //     id: character.ocid,
    //     name: character.character_name,
    //     world: character.world_name,
    //     class: character.character_class,
    //     level: character.character_level,
    //   });
    // });

    return NextResponse.json({ characters }, { status: 200 });
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
