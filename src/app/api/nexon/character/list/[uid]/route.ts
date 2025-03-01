import { prisma } from '@/utils/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;

    // DB 작업 요청
    const characters = await prisma.characters.findMany({
      where: { user_id: uid },
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
