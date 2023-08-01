import { Dayjs } from "dayjs";
import React from "react";
import Day from "./Day";
import clsx from "clsx";

interface Props extends React.ComponentProps<"div"> {
  month: Dayjs[][];
}

const Month = ({ month, className, ...props }: Props) => {
  return (
    <div
      className={clsx(
        "shrink-0 w-full grid grid-cols-7 grid-rows-6",
        className
      )}
      {...props}
    >
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
