import { useEffect, useState } from "react";
import { getMonth } from "../../utils/date";
import dayjs from "dayjs";
import Month from "./Month";
import ArrowIcon from "../../icons/ArrowIcon";
import { useAppContext } from "../../context/AppContext";
import useSwipe from "../../hooks/useSwipe";

const Calendar = () => {
  const { monthIndex, setMonthIndex } = useAppContext();

  const [previousMonth, setPreviousMonth] = useState(getMonth(monthIndex - 1));
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [nextMonth, setNextMonth] = useState(getMonth(monthIndex + 1));

  useEffect(() => {
    setPreviousMonth(getMonth(monthIndex - 1));
    setCurrentMonth(getMonth(monthIndex));
    setNextMonth(getMonth(monthIndex + 1));
  }, [monthIndex]);

  const handlePreviousMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const swipeHandlers = useSwipe({
    onSwipedLeft: handleNextMonth,
    onSwipedRight: handlePreviousMonth,
  });

  return (
    <div className="w-full bg-gray-darker text-gray-light overflow-hidden">
      <div className="flex justify-between px-10 py-2 border-b-gray-primary border-b">
        <div className="flex items-center space-x-4">
          <ArrowIcon className="h-3" onClick={handlePreviousMonth} />
          <span className="font-bold">
            {dayjs(new Date(dayjs().year(), monthIndex))
              .format("MMMM")
              .charAt(0)
              .toUpperCase() +
              dayjs(new Date(dayjs().year(), monthIndex))
                .format("MMMM")
                .slice(1)}
          </span>
          <ArrowIcon className="rotate-180 h-3" onClick={handleNextMonth} />
        </div>
      </div>
      <div
        className="w-full max-w-full touch-pan-y -translate-x-full"
        {...swipeHandlers}
      >
        <div className="min-w-full flex flex-row">
          <Month month={previousMonth} />
          <Month month={currentMonth} />
          <Month month={nextMonth} />
        </div>
      </div>
    </div>
  );
};

// TODO: Add <MenuIcon /> to convert to list
// TODO: Add transitions
// TODO: Add year if previous or next reached

export default Calendar;
