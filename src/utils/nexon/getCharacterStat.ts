import { NexonCharacterStatType, NexonErrorRes } from './returnType';

export async function getCharacterStat(
  ocid: string,
  token: string,
): Promise<NexonCharacterStatType | NexonErrorRes> {
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/stat?ocid=${ocid}`,
    {
      headers: {
        'x-nxopen-api-key': token.trim(),
      },
    },
  );

  const data = await res.json();

  return data;
}
