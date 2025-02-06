export enum StreamerId {
  NACHO = 'nacho',
  TERO = 'tero',
  BAEKDOA = 'baekdoa',
  JJANGJJUNG = 'jjangjjung',
  ISEUTEO = 'iseuteo',
  KONGJU = 'kongju',
  YUHIHI = 'yuhihi',
  GYEOMJI = 'gyeomji',
  NAENGIKIM = 'naengikim',
  NAMJIO = 'namjio',
  NUSEUNYANG = 'nuseunyang',
  UDEONG = 'udeong',
}

export type StreamerPlatform = 'soop' | 'youtube' | 'chzzk';

export type StreamerPlatformLink = {
  platform: StreamerPlatform;
  link: string;
}

export type Streamer = {
  id: StreamerId;
  nickname: string;
  links: StreamerPlatformLink[];
};

export const Streamers: Streamer[] = [
  {
    id: StreamerId.NACHO,
    nickname: '나초',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@nanna_nacho',
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/99704cbd2709e80c7f30276d8bd0994f',
      },
    ],
  },
  {
    id: StreamerId.TERO,
    nickname: '테로',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@Tero_'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/242b983916affb5ba4c9aa7765e11782'
      }
    ],
  },
  {
    id: StreamerId.BAEKDOA,
    nickname: '백도아',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EB%B0%B1%EB%8F%84%EC%95%84'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/f9efec5bd77dd0ea0a9c307057038348'
      }
    ],
  },
  {
    id: StreamerId.JJANGJJUNG,
    nickname: '짱쭝',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@WkdWnd'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/8fccc905e1d86062a6865519dbb85b81'
      }
    ],
  },
  {
    id: StreamerId.ISEUTEO,
    nickname: '이스터',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/easter0404'
      },
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EC%9D%B4%EC%8A%A4%ED%84%B0%EC%9C%A0%ED%8A%9C%EB%B8%8C'
      }
    ],
  },
  {
    id: StreamerId.KONGJU,
    nickname: '콩주',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@kong_ovo'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/58c857c619dbc62110f025c382265abe'
      }
    ],
  },
  {
    id: StreamerId.YUHIHI,
    nickname: '유히히',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/qqaa0810'
      },
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EC%9C%A0%ED%9E%88%ED%9E%88'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/23a96c7728efd75092e69befd8d3630d'
      }
    ],
  },
  {
    id: StreamerId.GYEOMJI,
    nickname: '겸지',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@cuteji'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/90805db274df92aa07b385c3ef6c8e5f'
      }
    ],
  },
  {
    id: StreamerId.NAENGIKIM,
    nickname: '냉이킴',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EB%83%89%EC%9D%B4%ED%82%B4'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/d90ed65ecb9c7231708a166362aaa247'
      }
    ],
  },
  {
    id: StreamerId.NAMJIO,
    nickname: '남지오',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/tmfrl4597'
      },
    ],
  },
  {
    id: StreamerId.NUSEUNYANG,
    nickname: '누스냥',
    links: [
      {
        platform: 'soop',
        link: 'https://ch.sooplive.co.kr/nusnyang'
      },
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@%EB%88%84%EC%8A%A4%EB%83%A5'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/1c0e0d1416a2b1fe69534f168f982d58'
      }
    ],
  },
  {
    id: StreamerId.UDEONG,
    nickname: '우덩',
    links: [
      {
        platform: 'youtube',
        link: 'https://www.youtube.com/@udeong'
      },
      {
        platform: 'chzzk',
        link: 'https://chzzk.naver.com/4cc2031a4597b6dd2d75c13fd375e433'
      }
    ],
  },
]
