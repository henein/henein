import { getCharacterSignatureList } from '@/utils/nexon/getCharacterList';
import { handleNexonApiError } from '@/utils/nexon/handleNexonApiError';
import {
  CharacterSignatureType,
  NexonAccountListType,
} from '@/utils/nexon/returnType';
import { createClient } from '@/utils/supabase/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { uid } = await request.json();
    const supabase = await createClient();
    const prisma = new PrismaClient();

    // user auth check
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return NextResponse.json(
        { message: '로그인 해주세요.' },
        { status: 401 },
      );

    if (user.id !== uid)
      return NextResponse.json(
        { message: '접근할 수 없는 데이터입니다.' },
        { status: 403 },
      );

    // DB 작업 요청
    const characters = await prisma.characters.findMany({
      where: { user_id: user.id },
    });

    return NextResponse.json({ characters }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) console.log('Error: ', error.stack);

    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}

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

    if (!res.ok) {
      return handleNexonApiError(response);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const characters = response.account_list
      .map((item: NexonAccountListType) => item.character_list)
      .flat()
      .map((info: CharacterSignatureType) => ({
        ocid: info.ocid,
        name: info.character_name,
        world: info.world_name,
        class: info.character_class,
        level: info.character_level,
        user_id: user?.id,
      }));

    // DB 작업 요청
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
