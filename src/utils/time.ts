import { DateTime } from "luxon";

export const getTimeDifference = (createTime: string) => {
  const userTimezone = DateTime.local().zoneName;
  const now = DateTime.now().setZone(userTimezone);
  const created = DateTime.fromISO(createTime, { zone: "utc" }).setZone(userTimezone);

  const diff = now.diff(created, ["years", "days", "hours", "minutes", "seconds"]);

  if (diff.years >= 1) return `${Math.floor(diff.years)}년 전`;
  if (diff.days >= 1) return `${Math.floor(diff.days)}일 전`;
  if (diff.hours >= 1) return `${Math.floor(diff.hours)}시간 전`;
  if (diff.minutes >= 1) return `${Math.floor(diff.minutes)}분 전`;
  return `${Math.floor(diff.seconds)}초 전`;
};
