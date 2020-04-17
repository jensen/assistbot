import { addMinutes, getTime } from "date-fns";

export const generateTimestamp = (date) =>
  Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

const exipirationDate = (date) =>
  getTime(
    addMinutes(
      new Date(date),
      process.env.REACT_APP_AR_COMPLETED_FADE_IN_MINUTES
    )
  );

export const getDifferenceFromNow = (date) =>
  getTime(date) - getTime(new Date());

export const getIsExpired = (date) =>
  date
    ? getDifferenceFromNow(exipirationDate(generateTimestamp(new Date(date)))) <
      0
    : false;

export const fadeIntoTime = (date) => {
  if (!date) return 1;

  const local = generateTimestamp(new Date(date));
  const created = getTime(local);
  const future = exipirationDate(local);
  const difference = getDifferenceFromNow(future);

  if (difference < 0) return 0;

  return difference / (future - created);
};

export const unixTimestamp = (date) => Math.floor(date / 1000);
