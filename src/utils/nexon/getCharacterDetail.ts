export const getCharacterDetail = async (ocid: string, token: string) => {
  const res = await fetch(
    `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`,
    {
      headers: {
        'x-nxopen-api-key': token.trim(),
      },
    },
  );

  return res;
};
