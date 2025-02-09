import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

// 리턴 포맷 형식: YYYY-MM-DD
export const formatToHyphenDate = (ISODate: string) => {
  // 사용자의 타임존 적용
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return dayjs.utc(ISODate).tz(userTimeZone).format('YYYY-MM-DD');
};
