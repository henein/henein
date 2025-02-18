import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  reqest: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;
    const prisma = new PrismaClient();
    // DB 작업 요청
    const profile = await prisma.profiles.findFirst({
      where: { id: uid },
    });

    return NextResponse.json({ profile }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) console.log('Error: ', error.stack);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
