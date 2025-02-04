// localhost:3000/api/mamudae <- 라우팅 경로는 임시입니다. 수정하겠습니다.

import { ChzzkClient } from 'chzzk';
import { NextRequest, NextResponse } from 'next/server';

const client = new ChzzkClient();

export async function GET(request: NextRequest) {
    const chzzkId = request.nextUrl.searchParams.get('chzzkId');
    const soopId = request.nextUrl.searchParams.get('soopId');

    if (chzzkId) {
        const live = await client.live.detail(chzzkId);
    
        return NextResponse.json({ isOnAir: live.livePlayback.media.length !== 0 });
      } else if (soopId) {
        const soopRes = await fetch(
          `https://chapi.sooplive.co.kr/api/${soopId}/station`,
          {
            headers: {
              Accept: 'application/json, text/plain, */*',
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
            },
          },
        );
        const station = await soopRes.json();
    
        return NextResponse.json({ isOnAir: station.broad ? true : false });
      }
    
      return NextResponse.error();
}
