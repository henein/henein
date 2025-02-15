export async function getCharacterSignatureList(token: string) {
  const res = await fetch(
    'https://open.api.nexon.com/maplestory/v1/character/list',
    {
      headers: {
        'x-nxopen-api-key': token.trim(),
      },
    },
  );
  return res;
}
