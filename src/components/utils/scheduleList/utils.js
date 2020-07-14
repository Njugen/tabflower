const getWeekdaysArray = () => {
  let weekdays = [];

  weekdays[0] = "sunday";
  weekdays[1] = "monday";
  weekdays[2] = "tuesday";
  weekdays[3] = "wednesday";
  weekdays[4] = "thursday";
  weekdays[5] = "friday";
  weekdays[6] = "saturday";

  return weekdays;
};

export const getTodayObj = () => {
  const date = new Date();
  const weekdays = getWeekdaysArray();

  const day = date.getDay();

  return {
    dayName: weekdays[day],
    order: day,
  };
};

export const getUpcomingDayObj = (dayName) => {
  const weekdays = getWeekdaysArray();

  return {
    dayName,
    order: weekdays.indexOf(dayName),
  };
};

export const determineDayDifference = (today, futureDay) => {
  if (today > 6) return false;

  let n = 0;

  if (today >= futureDay) {
    n += 7;
  } else {
    n = 0;
  }

  const diff = today !== futureDay ? (futureDay + n - today) % 7 : 7;

  return diff;
};

export const determineFutureDate = (numOfDaysFromNow) => {
  const currentDateAsMS = Date.now();
  const numOfDaysAsMS = 60 * 60 * 24 * 1000 * numOfDaysFromNow;

  const futureDate = new Date(currentDateAsMS + numOfDaysAsMS);

  const startOfFutureDate = new Date(
    futureDate.getFullYear(),
    futureDate.getMonth(),
    futureDate.getDate(),
    0,
    0,
    0
  );

  return {
    date: startOfFutureDate.getDate(),
    month: startOfFutureDate.getMonth(),
    year: startOfFutureDate.getFullYear(),
    startOfDateTimeInMS: startOfFutureDate.getTime(),
  };
};

export const convertTimeToMS = (hour, minute) => {
  const hourParamInMS = hour * 60 * 60 * 1000;
  const minuteParamInMS = minute * 60 * 1000;

  return hourParamInMS + minuteParamInMS;
};
