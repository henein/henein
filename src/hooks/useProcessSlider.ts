import { createElement, ReactNode, useEffect, useState } from 'react';
import Swiper from 'swiper';

export const useProcessSlider = () => {
  const [infoText, setInfoText] = useState<ReactNode | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const handleSlideChange = (swiper: Swiper) => {
    setActiveSlideIndex(swiper.activeIndex);
  };

  const getSlideInfoText = (index: number) => {
    switch (index) {
      case 0:
        const nexonLink = createElement(
          'a',
          {
            href: 'https://openapi.nexon.com/',
            target: '_blank',
            rel: 'noreferrer',
            key: 'nexon_key',
            style: {
              color: '#2183fa',
            },
          },
          'NEXON Open API',
        );
        const loginAndMyappText = createElement(
          'span',
          { key: 'text' },
          '에 접속해서 ➊로그인 하고 ➋My 애플리케이션으로 이동해주세요.',
        );
        return createElement('div', {}, [nexonLink, loginAndMyappText]);
      case 1:
        return createElement('span', {}, '애플리케이션 등록하기를 눌러주세요.');
      case 2:
        return createElement('span', {}, '내용을 위와 같이 입력해주세요.');
      case 3:
        return createElement(
          'span',
          {},
          '➊약관 동의를 하고 ➋아래 등록 버튼을 눌러주세요.',
        );
      case 4:
        return createElement(
          'span',
          {},
          '표시된 부분을 눌러서 상세 페이지로 이동해주세요.',
        );
      case 5:
        return createElement(
          'span',
          {},
          '표시된 부분을 눌러서 API Key를 복사해주세요.',
        );
      default:
        return;
    }
  };

  useEffect(() => {
    setInfoText(getSlideInfoText(activeSlideIndex) || null);
  }, [activeSlideIndex]);

  return { infoText, handleSlideChange };
};
