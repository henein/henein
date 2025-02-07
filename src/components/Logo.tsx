import Image from 'next/image';
import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
}

export const Logo = ({ size = 'large' }: LogoProps) => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={'/images/logo-light.svg'}
        alt="logo"
        width={size === 'small' ? 144 : 260}
        height={size === 'small' ? 40 : 49}
        priority
        className="brand text-brand dark:text-dark-brand fill-current"
      />
    </div>
  );
};
