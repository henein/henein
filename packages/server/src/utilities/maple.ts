import axios from 'axios';
import cheerio from 'cheerio';

export const getCharacterDetailToken = async (nickname: string) => {
  const searchPage = await axios.get(
    `https://maplestory.nexon.com/Ranking/World/Total?c=${encodeURI(nickname)}`
  );

  const $ = cheerio.load(searchPage.data);
  const $character = $('div.rank_table_wrap table tbody').children('tr');

  let characterDetailToken: string = '';

  $character.each(function (this: any, index, element) {
    if ($(this).find('td.left dl dt a').text() !== nickname) {
      return;
    }

    const token = $(this)
      .find('td.left dl dt a')
      .attr('href')
      ?.match(/(\?|\&)([^=]+)\=([^&]+)/);

    if (!token) {
      return;
    }

    characterDetailToken = token[3];
  });

  return characterDetailToken;
};

export const getCharacterStorageMoney = async (
  nickname: string,
  token: string
) => {
  const userStoragePage = await axios.get(
    `https://maplestory.nexon.com/Common/Character/Detail/${encodeURI(
      nickname
    )}/Storage?p=${token}`
  );

  const $ = cheerio.load(userStoragePage.data);
  const $money = $('div.money_txt');

  const moneyTextArray = $money.text().match(/\d{1,3}((,\d{3})+)?/);

  if (!moneyTextArray) {
    return;
  }

  const money = parseInt(moneyTextArray[0].replace(/,/g, ''));

  console.log(money);

  return money;
};
