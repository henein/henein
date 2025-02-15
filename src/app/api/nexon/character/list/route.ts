import { getCharacterSignatureList } from '@/utils/nexon/getCharacterList';
import { handleNexonApiError } from '@/utils/nexon/handleNexonApiError';
import {
  CharacterSignatureType,
  NexonAccountListType,
} from '@/utils/nexon/returnType';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const prisma = new PrismaClient();
    const { token } = await request.json();

    console.log(token);

    if (!token || !/^[a-zA-Z0-9._-]+$/.test(token)) {
      return NextResponse.json(
        { message: '유효한 API 키를 입력해주세요.' },
        { status: 400 },
      );
    }

    const res = await getCharacterSignatureList(token);
    const response = await res.json();

    if (!res.ok) return handleNexonApiError(response);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 });

    const characters = response.account_list
      .map((item: NexonAccountListType) => item.character_list)
      .flat()
      .map((info: CharacterSignatureType) => ({
        ocid: info.ocid,
        name: info.character_name,
        world: info.world_name,
        class: info.character_class,
        level: info.character_level,
        user_id: user.id,
      }));

    // DB 작업 요청

    // 아래 조건이 만족한다면 유저의 nexon_key update
    // 1. 데이터를 제대로 받아올 수 있는 nexon_key 인가?
    // 2. 다른 유저에게 등록되지않은 nexon_key 인가? === UNIQUE?
    // 3. 유저의 nexon_key 값이 NULL 인가?
    await prisma.profiles.update({
      where: {
        id: user.id,
      },
      data: {
        nexon_key: token,
      },
    });

    // 처음 조회할땐 괜찮은데 다시 조회했을때 중복되는 친구들은 어떻게 업데이트 할건지 생각해야함
    await prisma.characters.createManyAndReturn({
      data: characters,
    });

    return NextResponse.json(
      { message: 'success insert characters' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ', error.stack);
    }
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
