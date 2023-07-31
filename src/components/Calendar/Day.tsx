import dayjs, { Dayjs } from "dayjs";
import clsx from "clsx";

interface Props {
  day: Dayjs;
  rowIdx: number;
}

const Day = ({ day }: Props) => {
  const currentDayClass =
    day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-450 text-white font-bold rounded-full w-7"
      : "";

  return (
    <div className="border border-gray-primary flex flex-col min-h-[80px]">
      <header className="flex flex-col items-center">
        <p className={clsx("text-xs p-1 text-center", currentDayClass)}>
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer"></div>
    </div>
  );
};

export default Day;
