// ethiopianDateConverter.js

// Convert Gregorian date (year, month, day) to Julian Day Number (JDN)
export const gregorianToJDN = (year, month, day) => {
  const m = month + 1; // Adjust for 0-indexed JS months
  const a = Math.floor((14 - m) / 12);
  const y = year + 4800 - a;
  const adjustedMonth = m + 12 * a - 3;
  return (
    day +
    Math.floor((153 * adjustedMonth + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
};

// Convert JDN to Ethiopian date
export const jdnToEthiopian = (jdn) => {
  const offset = Math.floor(jdn) - 1723856;
  let r = offset % 1461;
  if (r < 0) r += 1461;
  
  const n = (r % 365) + 365 * Math.floor(r / 1460);
  const year = 4 * Math.floor(offset / 1461) + Math.floor(r / 365) - Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;
  
  return { year, month, day };
};

// Convert a JavaScript Date object to Ethiopian date
export const convertToEthiopian = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const day = date.getDate();
  const jdn = gregorianToJDN(year, month, day);
  return jdnToEthiopian(jdn);
};