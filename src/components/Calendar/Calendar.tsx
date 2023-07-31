import { useEffect, useRef, useState } from "react";
import { getMonth } from "../../utils/date";
import dayjs from "dayjs";
import Month from "./Month";
import ArrowIcon from "../../icons/ArrowIcon";
import { useAppContext } from "../../context/AppContext";
import useSwipe from "../../hooks/useSwipe";

const Calendar = () => {
  const { monthIndex, setMonthIndex } = useAppContext();
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  const handlePreviousMonth = () => {
    // if (containerRef.current) {
    //   containerRef.current.style.transform = "translateX(100%)";
    //   containerRef.current.addEventListener(
    //     "transitionend",
    //     () => {
    //       containerRef.current!.style.transform = "none";
    setMonthIndex(monthIndex - 1);
    //     },
    //     { once: true }
    //   );
    // }
  };
  const handleNextMonth = () => {
    // if (containerRef.current) {
    //   containerRef.current.style.transform = "translateX(-100%)";
    //   containerRef.current.addEventListener(
    //     "transitionend",
    //     () => {
    //       containerRef.current!.style.transform = "none";
    setMonthIndex(monthIndex + 1);
    //     },
    //     { once: true }
    //   );
    // }
  };

  const swipeHandlers = useSwipe({
    onSwipedLeft: handleNextMonth,
    onSwipedRight: handlePreviousMonth,
  });

  return (
    <div
      className="w-full bg-gray-darker text-gray-light slide-animation"
      ref={containerRef}
      {...swipeHandlers}
    >
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
      <Month month={currentMonth} />
    </div>
  );
};

// TODO: Add <MenuIcon /> to convert to list
// TODO: Add transitions
// TODO: Add year if previous or next reached

export default Calendar;
