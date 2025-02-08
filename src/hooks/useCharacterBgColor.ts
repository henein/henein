import { getColor } from 'color-thief-node';
import { useEffect, useState } from 'react';

const convertRGBToHSL = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
};

export const useCharacterBgColor = (image: string) => {
  const [imageRandomColor, setImageRandomColor] = useState({
    light: '',
    dark: '',
  });

  useEffect(() => {
    const img = document.createElement('img');
    img.src = image;

    const colorRGB = getColor(img);
    const color = convertRGBToHSL(colorRGB[0], colorRGB[1], colorRGB[2]);
    setImageRandomColor({
      light: `bg-[color:hsl(${color[0]}, 15%, 25%)]`,
      dark: `bg-[color:hsl(${color[0]}, 100%, 95%)]`,
    });
  }, [image]);

  return { imageRandomColor };
};
