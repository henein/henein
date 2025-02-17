import { NexonCharacterListType, NexonErrorRes } from './returnType';

export async function getCharacterSignatureList(
  token: string,
): Promise<NexonCharacterListType | NexonErrorRes> {
  const res = await fetch(
    'https://open.api.nexon.com/maplestory/v1/character/list',
    {
      headers: {
        'x-nxopen-api-key': token.trim(),
      },
    },
  );

  const data = await res.json();
  return data;
}
