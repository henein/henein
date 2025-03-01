import { getCharacterDetail } from '@/utils/nexon/getCharacterDetail';
import { getCharacterStat } from '@/utils/nexon/getCharacterStat';
import { handleNexonApiError } from '@/utils/nexon/handleNexonApiError';
import { prisma } from '@/utils/prisma';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ocid: string }> },
) {
  try {
    const { ocid } = await params;
    const token = `${process.env.NEXON_LIVE_API_KEY}`;

    // 1. ocid로 조회
    const [detail, stat] = await Promise.all([
      getCharacterDetail(ocid, token),
      getCharacterStat(ocid, token),
    ]);

    // NEXON API 에러처리
    if ('error' in detail) {
      console.log(detail);
      const { message, description, status } = handleNexonApiError(detail);
      return NextResponse.json({ message, description }, { status });
    }

    if ('error' in stat) {
      console.log(stat);
      const { message, description, status } = handleNexonApiError(stat);
      return NextResponse.json({ message, description }, { status });
    }

    // DB upsert 작업 요청
    const character = await prisma.characters.update({
      where: { ocid },
      data: {
        updated_at: dayjs(Date.now()).toISOString(),
        exp: detail.character_exp.toString(),
        exp_rate: detail.character_exp_rate,
        image: detail.character_image,
        stat: JSON.stringify(stat.final_stat),
      },
    });

    return NextResponse.json(
      { message: `${character.name} 업데이트 성공` },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
