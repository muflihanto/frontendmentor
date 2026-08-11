/**
 * convert TZ identifier string (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) to utc offset (ex: UTC +07:00)
 */
export function getTimezoneOffset(tz: string): string {
  const d1 = new Date(Date.now());
  d1.setMilliseconds(0); // for nice rounding
  const d1OffsetHrs = (d1.getTimezoneOffset() / 60) * -1;

  const d2LocaleStr = d1.toLocaleString("en-US", { timeZone: tz });
  const d2 = new Date(d2LocaleStr);

  const diffHrs = (d2.getTime() - d1.getTime()) / 1000 / 60 / 60;
  const d2OffsetHrs = d1OffsetHrs + diffHrs;

  let formattedOffset = "UTC ";
  switch (true) {
    case d2OffsetHrs < -9:
      formattedOffset += `${d2OffsetHrs}`;
      break;
    case d2OffsetHrs < 0:
      formattedOffset += `-0${d2OffsetHrs.toString()[1]}`;
      break;
    case d2OffsetHrs < 10:
      formattedOffset += `+0${d2OffsetHrs}`;
      break;
    default:
      formattedOffset += `+${d2OffsetHrs}`;
  }

  return `${formattedOffset}:00`;
}
