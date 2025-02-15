export enum WorldId {
  All = 'all',
  Scania = 'scania',
  Luna = 'luna',
  Elysium = 'elysium',
  Croa = 'croa',
  Bera = 'bera',
  Aurora = 'aurora',
  Enosis = 'enosis',
  Union = 'union',
  Zenith = 'zenith',
  Red = 'red',
  Arcane = 'arcane',
  Nova = 'nova',
  Eos = 'eos',
  Helios = 'helios',
  Burning = 'burning',
  Challengers = 'challengers',
  Reboot = 'reboot',
}

export type World = {
  id: WorldId;
  name: string;
};

export const worlds: World[] = [
  { id: WorldId.All, name: '전체 월드' },
  { id: WorldId.Scania, name: '스카니아' },
  { id: WorldId.Luna, name: '루나' },
  { id: WorldId.Elysium, name: '엘리시움' },
  { id: WorldId.Croa, name: '크로아' },
  { id: WorldId.Bera, name: '베라' },
  { id: WorldId.Aurora, name: '오로라' },
  { id: WorldId.Enosis, name: '이노시스' },
  { id: WorldId.Union, name: '유니온' },
  { id: WorldId.Zenith, name: '제니스' },
  { id: WorldId.Red, name: '레드' },
  { id: WorldId.Arcane, name: '아케인' },
  { id: WorldId.Nova, name: '노바' },
  { id: WorldId.Eos, name: '에오스' },
  { id: WorldId.Helios, name: '헬리오스' },
  { id: WorldId.Burning, name: '버닝' },
  { id: WorldId.Challengers, name: '챌린저스' },
  { id: WorldId.Reboot, name: '리부트' },
];
