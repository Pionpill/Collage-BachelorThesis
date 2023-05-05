type datePrecision = "ms" | "sec" | "min" | "hour" | "d" | "m" | "y";

/**
 * 格式化时间
 * @param date 时间
 * @param precision 精确值
 * @returns 格式化时间
 */
export const formatDate = (
  date: Date,
  precision: datePrecision = "sec"
): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const ms = date.getMilliseconds();
  switch (precision) {
    case "y":
      return `${date.getFullYear()}`;
    case "m":
      return `${year}-${month > 9 ? month : "0" + String(month + 1)}`;
    case "d":
      return `${year}-${month > 9 ? month : "0" + String(month + 1)}-${
        day > 9 ? day : "0" + String(day)
      }`;
    case "hour":
      return `${year}-${month > 9 ? month : "0" + String(month + 1)}-${
        day > 9 ? day : "0" + String(day)
      }T${hour > 9 ? hour : "0" + String(hour)}`;
    case "min":
      return `${year}-${month > 9 ? month : "0" + String(month + 1)}-${
        day > 9 ? day : "0" + String(day)
      }T${hour > 9 ? hour : "0" + String(hour)}:${
        minute > 9 ? minute : "0" + String(minute)
      }`;
    case "sec":
      return `${year}-${month > 9 ? month : "0" + String(month + 1)}-${
        day > 9 ? day : "0" + String(day)
      }T${hour > 9 ? hour : "0" + String(hour)}:${
        minute > 9 ? minute : "0" + String(minute)
      }:${second > 9 ? second : "0" + String(second)}`;
    case "ms":
      return `${year}-${month > 9 ? month : "0" + String(month + 1)}-${
        day > 9 ? day : "0" + String(day)
      }T${hour > 9 ? hour : "0" + String(hour)}:${
        minute > 9 ? minute : "0" + String(minute)
      }:${second > 9 ? second : "0" + String(second)}:${String(ms)}`;
  }
};

/**
 * 获取两个时间的时间差
 * @param date1 较远的时间
 * @param date2 较近的时间
 * @returns 时间差，单位: ms
 */
export const getTimeSpan = (
  date1: Date,
  date2: Date,
  precision: datePrecision = "sec"
): number => {
  const timeSpan = date2.getTime() - date1.getTime();
  switch (precision) {
    case "ms":
      return timeSpan;
    case "sec":
      return Math.floor(timeSpan / 1000);
    case "min":
      return Math.floor(timeSpan / 1000 / 60);
    case "hour":
      return Math.floor(timeSpan / 1000 / 60 / 60);
    case "d":
      return Math.floor(timeSpan / 1000 / 60 / 60 / 24);
    case "m":
      return Math.floor(timeSpan / 1000 / 60 / 60 / 24 / 30);
    case "y":
      return Math.floor(timeSpan / 1000 / 60 / 60 / 24 / 365);
  }
};

export const formatLastUpdateTimeSpan = (date: Date): string => {
  const now = new Date();
  const timeSpanByH = getTimeSpan(date, now, "hour");
  if (timeSpanByH < 3) return "刚刚更新";
  if (timeSpanByH < 24) return "一天内更新";
  const timeSpanByD = getTimeSpan(date, now, "d");
  if (timeSpanByD < 30) return `${timeSpanByD}天前`;
  const timeSpanByM = getTimeSpan(date, now, "m");
  if (timeSpanByM < 12) return `${timeSpanByM}月前`;
  const timeSpanByY = getTimeSpan(date, now, "y");
  return `${timeSpanByY}年前`;
};
