import { getJobs } from './maple';

// describe('Get character detail page token', () => {
//   test('Existing nickname', async () => {
//     expect(await getCharacterDetailToken('나초봄지')).not.toBe('');
//   });

//   test('Not existing nickname', async () => {
//     expect(await getCharacterDetailToken('메이플스토리')).toBe('');
//   });
// });

describe('Get a jobs', () => {
  test('초보자 확인', async () => {
    expect(await getJobs()).not.toBeNull;
  });
});
