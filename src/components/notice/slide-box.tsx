'use client';

import NoticeItem from './notice-item';
import './style.css';
import { notices as Notice } from '@prisma/client';
import React from 'react';
import Slider from 'react-slick';

const SlideBox = ({ notices }: { notices: Notice[] }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    pauseOnHover: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log(notices);

  return (
    <Slider {...settings}>
      {notices.map((item) => (
        <NoticeItem text={item.title} key={item.id} />
      ))}
    </Slider>
  );
};

export default SlideBox;
