import { StreamerProfile } from '@/components';
import { Streamer, StreamerId, Streamers } from '@/constants';
import { ChzzkClient } from 'chzzk';
import type { Metadata } from 'next';
import Image from 'next/image';

export const revalidate = 60;

export const metadata: Metadata = {
  title: '메무대 시즌2',
};

const client = new ChzzkClient();

async function fetchLive(streamer: Streamer) {
  const chzzkLink = streamer.links.find(
    (link) => link.platform === 'chzzk',
  )?.link;
  const soopLink = streamer.links.find(
    (link) => link.platform === 'soop',
  )?.link;

  if (chzzkLink) {
    const chzzkId = chzzkLink.replace('https://chzzk.naver.com/', '');

    const live = await client.live.detail(chzzkId);

    return live.livePlayback?.media.length !== 0;
  } else if (soopLink) {
    const soopId = soopLink.replace('https://ch.sooplive.co.kr/', '');

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

    return station.broad ? true : false;
  }

  return false;
}

export default async function Home() {
  const liveStatus = await Promise.all(
    Streamers.map(async (streamer) => ({
      [streamer.id]: await fetchLive(streamer),
    })),
  ).then((results) => Object.assign({}, ...results));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center leading-6">
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center pb-16">
        <Image
          className="rounded-2xl"
          src="/images/mamudae/poster.png"
          alt=""
          width={1920}
          height={1080}
          quality={100}
        />
      </div>
      <h2 className="mb-6 mt-6 text-3xl font-bold">티저</h2>
      <iframe
        className="aspect-video w-full max-w-3xl"
        src="https://www.youtube.com/embed/4PbzlV_Sdx0?si=CDaC7Vs3aLqbdlcC"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h2 className="mb-6 mt-40 text-3xl font-bold">참여자</h2>
      <div className="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <StreamerProfile
          streamerId={StreamerId.NACHO}
          isLive={liveStatus[StreamerId.NACHO]}
        />
        <StreamerProfile
          streamerId={StreamerId.BAEKDOA}
          isLive={liveStatus[StreamerId.BAEKDOA]}
        />
        <StreamerProfile
          streamerId={StreamerId.JJANGJJUNG}
          isLive={liveStatus[StreamerId.JJANGJJUNG]}
        />
        <StreamerProfile
          streamerId={StreamerId.ISEUTEO}
          isLive={liveStatus[StreamerId.ISEUTEO]}
        />
        <StreamerProfile
          streamerId={StreamerId.KONGJU}
          isLive={liveStatus[StreamerId.KONGJU]}
        />
        <StreamerProfile
          streamerId={StreamerId.YUHIHI}
          isLive={liveStatus[StreamerId.YUHIHI]}
        />
        <StreamerProfile
          streamerId={StreamerId.GYEOMJI}
          isLive={liveStatus[StreamerId.GYEOMJI]}
        />
        <StreamerProfile
          streamerId={StreamerId.NAENGIKIM}
          isLive={liveStatus[StreamerId.NAENGIKIM]}
        />
        <StreamerProfile
          streamerId={StreamerId.NAMJIO}
          isLive={liveStatus[StreamerId.NAMJIO]}
        />
        <StreamerProfile
          streamerId={StreamerId.NUSEUNYANG}
          isLive={liveStatus[StreamerId.NUSEUNYANG]}
        />
        <StreamerProfile
          streamerId={StreamerId.UDEONG}
          isLive={liveStatus[StreamerId.UDEONG]}
        />
        <StreamerProfile
          streamerId={StreamerId.JIMYEONG}
          isLive={liveStatus[StreamerId.JIMYEONG]}
        />
      </div>
      <h2 className="mb-6 mt-40 text-3xl font-bold">규정</h2>
      <div className="border-default bg-grey-50 dark:bg-grey-800 rounded-2xl border px-6 py-5">
        <h3 className="font-bold">시청자 지원 가능</h3>
        <ul className="list-inside list-disc">
          <li>
            각 팀별 길드 주간 미션 포인트 / 지하 수로 / 플래그 레이스 지원 가능
          </li>
        </ul>
        <h3 className="mt-4 font-bold">시청자 지원 금지</h3>
        <ul className="list-inside list-disc">
          <li>시청자 지원 금지 상하차 등 사냥 관련 지원 금지</li>
          <li>
            이하 금지 직업 및 스킬 (사냥에 영향을 주는 모든 스킬)
            <ul className="ml-4 list-inside list-disc">
              <li>나이트로드 - 쇼다운 챌린지, 쇼다운 챌린지 : 인핸스</li>
              <li>데몬슬레이어 - 데빌 크라이</li>
              <li>배틀메이지 - 디버프 오라 : 인핸스</li>
              <li>소울마스터 - 트루 사이트, 트루 사이트 : 인핸스</li>
              <li>은월 - 파쇄철조 류</li>
              <li>키네시스 - 싸이킥 포스 류</li>
              <li>사냥 시 시청자와 파티 금지</li>
            </ul>
          </li>
        </ul>
        <h3 className="mt-4 font-bold">가능 규정</h3>
        <ul className="list-inside list-disc">
          <li>
            링크 캐릭터로 사냥 가능
            <ul className="ml-4 list-inside list-disc">
              <li>
                단, 본 게임 진행 이후 가능하며, 기존의 아이템들은 모두 버리고난
                뒤 진행 가능
              </li>
              <li>
                본 게임 진행하며 생긴 마일리지 또는 메소로 슬롯 증설 후 추가
                캐릭터 육성 가능
              </li>
            </ul>
          </li>
          <li>
            메이플 옥션 (경매장) 사용 가능
            <ul className="ml-4 list-inside list-disc">
              <li>
                단, 12시간 이내로 남은 아이템만 구매 가능 (시청자의 헐값 판매
                아이템 구매 방지)
              </li>
            </ul>
          </li>
        </ul>
        <h3 className="mt-4 font-bold">금지 규정</h3>
        <ul className="list-inside list-disc">
          <li>PC방 금지</li>
          <li>
            시청자의 지원 금지
            <ul className="ml-4 list-inside list-disc">
              <li>
                단, 기상 효과 아이템 뿌리기, 코디 아이템(외형 프리셋 적용)은
                가능
              </li>
            </ul>
          </li>
          <li>대리 금지</li>
          <li>
            현질 및 MVP 보상 수령 금지
            <ul className="ml-4 list-inside list-disc">
              <li>
                단, 코디 아이템 구매는 가능. MVP 등급이 올라가지 않는 선에서
                가능
              </li>
            </ul>
          </li>
          <li>자유 전직 및 직업 중복 금지</li>
          <li>메이플스토리M 금지</li>
          <li>사전 육성 중 모든 이벤트 참여 금지</li>
        </ul>
      </div>
    </div>
  );
}
