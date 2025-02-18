import { NexonCharacterBasicType, NexonErrorRes } from './returnType';

export const getCharacterDetail = async (
  ocid: string,
  token: string,
): Promise<NexonCharacterBasicType | NexonErrorRes> => {
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
    {
      headers: {
        'x-nxopen-api-key': token.trim(),
      },
    },
  );

  const data = await res.json();
  return data;
};
