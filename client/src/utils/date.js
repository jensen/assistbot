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

export const unixTimestamp = (date) => Math.floor(date / 1000);
