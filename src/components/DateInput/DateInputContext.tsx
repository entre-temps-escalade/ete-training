import { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface IDateInputContext {
  opened: boolean;
  value: Dayjs;
  open: () => void;
  close: () => void;
  targetRef: HTMLElement | null;
  setTargetRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  currentDay: Dayjs;
  prevMonth: () => void;
  nextMonth: () => void;
  prevYear: () => void;
  nextYear: () => void;
  prevDecade: () => void;
  nextDecade: () => void;
  days: Dayjs[][];
  changeCurrentMonth: (month: number) => void;
  changeCurrentYear: (month: number) => void;
  resetCurrentDay: () => void;
}

export const DateInputContext = createContext<IDateInputContext | null>(null);

export const DateInputProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: Dayjs }>) => {
  const [opened, setOpened] = useState(false);
  const [targetRef, setTargetRef] = useState<HTMLElement | null>(null);
  const [currentDay, setCurrentDay] = useState(value);
  const [days, setDays] = useState<Dayjs[][]>([]);

  function prevMonth() {
    setCurrentDay((currentDay) => currentDay.subtract(1, "month"));
  }

  function nextMonth() {
    setCurrentDay((currentDay) => currentDay.add(1, "month"));
  }

  function prevYear() {
    setCurrentDay((currentDay) => currentDay.subtract(1, "year"));
  }

  function nextYear() {
    setCurrentDay((currentDay) => currentDay.add(1, "year"));
  }

  function prevDecade() {
    setCurrentDay((currentDay) => currentDay.subtract(10, "year"));
  }

  function nextDecade() {
    setCurrentDay((currentDay) => currentDay.add(10, "year"));
  }

  function changeCurrentMonth(month: number) {
    setCurrentDay((currentDay) => currentDay.month(month));
  }

  function changeCurrentYear(year: number) {
    setCurrentDay((currentDay) => currentDay.year(year));
  }

  function resetCurrentDay() {
    setCurrentDay(value);
  }

  function close() {
    setOpened(false);
  }

  function open() {
    setOpened(true);
  }

  useEffect(() => {
    let currentDate = currentDay.startOf("month").weekday(0);
    const nextMonth = currentDay.add(1, "month").month();

    const allDates = [];
    let weekDates = [];
    let weekCounter = 1;

    while (currentDate.weekday(0).month() !== nextMonth) {
      weekDates.push(currentDate);

      if (weekCounter === 7) {
        allDates.push(weekDates);
        weekDates = [];
        weekCounter = 0;
      }

      weekCounter++;
      currentDate = currentDate.add(1, "day");
    }

    setDays(allDates);
  }, [currentDay]);

  return (
    <DateInputContext.Provider
      value={{
        opened,
        resetCurrentDay,
        open,
        close,
        targetRef,
        setTargetRef,
        currentDay,
        prevMonth,
        nextMonth,
        nextYear,
        prevYear,
        prevDecade,
        nextDecade,
        value,
        days,
        changeCurrentMonth,
        changeCurrentYear,
      }}
    >
      {children}
    </DateInputContext.Provider>
  );
};
