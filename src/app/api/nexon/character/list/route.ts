import { getCharacterSignatureList } from '@/utils/nexon/getCharacterList';
import { handleNexonApiError } from '@/utils/nexon/handleNexonApiError';
import { NexonCharacterSignatureType } from '@/utils/nexon/returnType';
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

    console.log(response);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const characters = response.account_list
      .map((item: any) => item.character_list)
      .flat()
      .map((item: NexonCharacterSignatureType) => ({
        data: {
          ocid: item.ocid,
          name: item.character_name,
          world: item.world_name,
          class: item.character_class,
          level: item.character_level,
          user_id: user?.id,
        },
      }));

    console.log(characters);
    // DB 작업 요청
    try {
      await prisma.characters.createManyAndReturn(characters);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error: ', error.stack);
      }
    }

    return NextResponse.json(
      { message: 'success insert characters' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
