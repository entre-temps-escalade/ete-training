import dayjs from "dayjs";
import durationPlugin from "dayjs/plugin/duration";
import "dayjs/locale/fr";

dayjs.locale("fr");
dayjs.extend(durationPlugin);

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day();

  let currentMonthCount = 0 - firstDayOfTheMonth;

  const days = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;

      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return days;
}

export function formatDuration(durationSecs: number) {
  const duration = dayjs.duration(durationSecs);

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (hours > 0 && seconds > 0)
    return `${hours * 60 * 60 + minutes * 60 + seconds} s`;
  if (hours > 0 && minutes > 0) return `${hours * 60 + minutes} min`;
  if (hours > 0) return `${hours} h`;

  if (minutes > 0 && seconds > 0) return `${minutes * 60 + seconds} s`;
  if (minutes > 0) return `${minutes} min`;

  return `${seconds} s`;
}
