import { StreamerProfile } from '@/components';
import { StreamerId } from '@/constants';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center leading-6">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center pb-16">
        <Image
          className="rounded-2xl"
          src="/images/mamudae/poster.png"
          alt=""
          width={1920}
          height={1080}
          quality={100}
        />
      </div>
      <h2 className="mb-6 mt-6 text-3xl font-bold">참여자</h2>
      <div className="flex justify-between gap-1">
        <StreamerProfile streamerId={StreamerId.NACHO} />
        <StreamerProfile streamerId={StreamerId.TERO} />
        <StreamerProfile streamerId={StreamerId.BAEKDOA} />
        <StreamerProfile streamerId={StreamerId.JJANGJJUNG} />
        <StreamerProfile streamerId={StreamerId.ISEUTEO} />
        <StreamerProfile streamerId={StreamerId.KONGJU} />
      </div>
      <div className="mt-4 flex justify-between gap-1">
        <StreamerProfile streamerId={StreamerId.YUHIHI} />
        <StreamerProfile streamerId={StreamerId.GYEOMJI} />
        <StreamerProfile streamerId={StreamerId.NAENGIKIM} />
        <StreamerProfile streamerId={StreamerId.NAMJIO} />
        <StreamerProfile streamerId={StreamerId.NUSEUNYANG} />
        <StreamerProfile streamerId={StreamerId.UDEONG} />
      </div>
      <h2 className="mb-6 mt-32 text-3xl font-bold">규정</h2>
      <div className="border-dark-border bg-grey-800 rounded-2xl border px-6 py-5">
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
