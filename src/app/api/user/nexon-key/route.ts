import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const prisma = new PrismaClient();
    const { token, isValidNexonKey, uid } = await request.json(); // body에서 token 받기

    if (!token) {
      return NextResponse.json(
        { message: 'Nexon Key가 제공되지 않았습니다.' },
        { status: 400 },
      );
    }

    // 1. Nexon Key가 유효한지 검사
    if (!isValidNexonKey) {
      return NextResponse.json(
        { message: '유효하지 않은 Nexon Key입니다.' },
        { status: 400 },
      );
    }

    // 2. 다른 유저가 이미 사용 중인지 확인
    const existingUser = await prisma.profiles.findFirst({
      where: { nexon_key: token },
    });
    if (existingUser && existingUser.id !== uid) {
      return NextResponse.json(
        { message: '이미 다른 유저에게 등록된 Nexon Key입니다.' },
        { status: 409 },
      );
    }

    const profile = await prisma.profiles.findUnique({
      where: { id: uid },
    });

    if (!profile) {
      return NextResponse.json(
        { message: '해당 유저를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    if (profile.nexon_key && profile.nexon_key !== token) {
      return NextResponse.json(
        { message: '해당 유저의 Nexon Key가 이미 존재합니다.' },
        { status: 409 },
      );
    }

    // 모든 조건을 통과하면 Nexon Key 업데이트
    await prisma.profiles.update({
      where: { id: uid },
      data: { nexon_key: token },
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
