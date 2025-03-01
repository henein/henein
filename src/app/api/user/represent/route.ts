import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const { uid, char_id } = await request.json(); // body에서 token 받기

    const profile = await prisma.profiles.findUnique({
      where: { id: uid },
    });

    if (!profile) {
      return NextResponse.json(
        { message: '해당 유저를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    const character = await prisma.characters.findUnique({
      where: { id: char_id },
    });

    if (!character) {
      return NextResponse.json(
        { message: '해당 캐릭터를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    if (!character.image) {
      return NextResponse.json(
        { message: '인증된 캐릭터만 대표캐릭터로 설정할 수 있습니다.' },
        { status: 403 },
      );
    }

    // 대표 캐릭터 업데이트
    await prisma.profiles.update({
      where: { id: uid },
      data: {
        master_character: profile.master_character === char_id ? null : char_id,
      },
    });

    return NextResponse.json(
      { message: 'Nexon Key가 정상적으로 등록되었습니다.' },
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
