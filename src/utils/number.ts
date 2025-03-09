export const formatNumber = (num: number) => {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(1)}억`; // 억 단위 (소수점 한 자리)
  } else if (num >= 10000) {
    return `${Math.ceil(num / 10000)}만`; // 만 단위
  }
  return num.toString(); // 1만 미만은 그대로 표시
};
