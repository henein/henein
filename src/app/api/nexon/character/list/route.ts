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

    // 유저 로그인 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user)
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 });

    // input으로 받아온 토큰 검사
    if (!token || !/^[a-zA-Z0-9._-]+$/.test(token)) {
      return NextResponse.json(
        { message: '유효한 API 키를 입력해주세요.' },
        { status: 400 },
      );
    }

    // 받아온 토큰을 통한 nexon api 요청
    const signatureList = await getCharacterSignatureList(token);

    if ('error' in signatureList) {
      const { message, description, status } =
        handleNexonApiError(signatureList);
      return NextResponse.json({ message, description }, { status });
    }

    // nexon api 요청 성공시 key update 요청
    const patchKey = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/nexon-key`,
      {
        method: 'PATCH',
        body: JSON.stringify({ token, uid: user.id, isValidNexonKey: true }),
      },
    );

    const patchKeyJson = await patchKey.json();
    if (!patchKey.ok) {
      console.log(patchKeyJson);
      return NextResponse.json(
        { message: 'forbidden', description: patchKeyJson.message },
        { status: 400 },
      );
    }

    const characters = signatureList.account_list
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
    // 1. 기존 DB에 있는 캐릭터 ocid 리스트 가져오기
    const existingCharacters = await prisma.characters.findMany({
      where: {
        ocid: { in: characters.map((c) => c.ocid) },
      },
      select: { ocid: true },
    });
    const existingOcidSet = new Set(existingCharacters.map((c) => c.ocid));

    // 2. 새롭게 추가해야 하는 캐릭터 필터링
    const newCharacters = characters.filter(
      (c) => !existingOcidSet.has(c.ocid),
    );

    if (newCharacters.length > 0) {
      await prisma.characters.createMany({
        data: newCharacters,
      });
    }

    // 3. 기존 캐릭터들은 한 번에 업데이트
    const updatePromises = characters
      .filter((c) => existingOcidSet.has(c.ocid))
      .map((c) =>
        prisma.characters.update({
          where: { ocid: c.ocid },
          data: {
            name: c.name,
            world: c.world,
            class: c.class,
            level: c.level,
            user_id: c.user_id,
          },
        }),
      );

    await Promise.all(updatePromises);

    return NextResponse.json(
      { message: '캐릭터 동기화에 성공하였습니다.' },
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
