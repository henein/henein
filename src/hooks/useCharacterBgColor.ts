import ColorThief from 'colorthief';
import { useCallback, useEffect, useState } from 'react';

const hslToHex = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return `#${[f(0), f(8), f(4)]
    .map((x) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
};

// 🔥 RGB → HSL 변환 (이전 코드 유지)
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

export const useCharacterBgColor = (image: string | null) => {
  const [imageRandomColor, setImageRandomColor] = useState({
    light: '',
    dark: '',
  });

  const colorSetter = useCallback(() => {
    if (!image) {
      setImageRandomColor({
        light: '#404040',
        dark: '#f0f0f0',
      });
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const colorRGB = colorThief.getColor(img);

        const hslColor = convertRGBToHSL(colorRGB[0], colorRGB[1], colorRGB[2]);

        setImageRandomColor({
          light: `${hslToHex(hslColor[0], 15, 25)}`,
          dark: `${hslToHex(hslColor[0], 100, 95)}`,
        });
      } catch (error) {
        console.error('ColorThief Error:', error);
        setImageRandomColor({
          light: '#404040',
          dark: '#f0f0f0',
        });
      }
    };

    img.onerror = () => {
      console.error('Failed to load image:', image);
      setImageRandomColor({
        light: '#404040',
        dark: '#f0f0f0',
      });
    };
  }, [image]);

  useEffect(() => {
    colorSetter();
  }, [colorSetter]);

  return { imageRandomColor };
};
