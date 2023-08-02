import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import ArrowIcon from "../../icons/ArrowIcon";
import { useAppContext } from "../../context/AppContext";
import { getMonth } from "../../utils/date";
import Month from "./Month";
import useSwipe from "../../hooks/useSwipe";

const Calendar = () => {
  const { monthIndex, setMonthIndex } = useAppContext();

  const [previousMonth, setPreviousMonth] = useState(getMonth(monthIndex - 1));
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [nextMonth, setNextMonth] = useState(getMonth(monthIndex + 1));

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPreviousMonth(getMonth(monthIndex - 1));
    setCurrentMonth(getMonth(monthIndex));
    setNextMonth(getMonth(monthIndex + 1));
  }, [monthIndex]);

  const handlePreviousMonth = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 250ms ease";
      containerRef.current.style.transform = "translateX(100%)";

      containerRef.current.addEventListener(
        "transitionend",
        () => {
          setMonthIndex(monthIndex - 1);

          setTimeout(() => {
            containerRef.current!.style.transition = "none";
            containerRef.current!.style.transform = "none";
          }, 10);
        },
        { once: true }
      );
    }
  };

  const handleNextMonth = () => {
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 250ms ease";
      containerRef.current.style.transform = "translateX(-100%)";

      containerRef.current.addEventListener(
        "transitionend",
        () => {
          setMonthIndex(monthIndex + 1);

          setTimeout(() => {
            containerRef.current!.style.transition = "none";
            containerRef.current!.style.transform = "none";
          }, 10);
        },
        { once: true }
      );
    }
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
                .slice(1)}{" "}
            {dayjs(new Date(dayjs().year(), monthIndex)).year() !==
              dayjs().year() &&
              dayjs(new Date(dayjs().year(), monthIndex)).year()}
          </span>
          <ArrowIcon className="rotate-180 h-3" onClick={handleNextMonth} />
        </div>
      </div>
      <div className="w-full max-w-full touch-pan-y -translate-x-full">
        <div
          className="min-w-full flex flex-row"
          ref={containerRef}
          {...swipeHandlers}
        >
          <Month month={previousMonth} />
          <Month month={currentMonth} />
          <Month month={nextMonth} />
        </div>
      </div>
    </div>
  );
};

// TODO: Add <MenuIcon /> to convert to list
// TODO: Add Month list when clicking on the month to select quicker
// TODO: Add year if previous or next reached

export default Calendar;
