import dayjs, { Dayjs } from "dayjs";
import { createContext, PropsWithChildren } from "react";

interface IDateSliderContext {
  today: () => void;
  value: Dayjs;
  apply: (type: "month" | "year" | "day", date: number) => void;
}

export const DateSliderContext = createContext<IDateSliderContext | null>(null);

export const DateSliderProvider = ({
  children,
  onChange,
  value,
}: PropsWithChildren<{ value: Dayjs; onChange: (value: Dayjs) => void }>) => {
  const today = () => onChange(dayjs());

  function apply(type: "month" | "year" | "day", date: number) {
    onChange(
      value
        .year(
          type === "year"
            ? dayjs()
                .year(dayjs().year() + date - 10)
                .year()
            : value.year(),
        )
        .month(type === "month" ? date : value.month())
        .date(type === "day" ? date : value.date()),
    );
  }

  return (
    <DateSliderContext.Provider
      value={{
        value,
        apply,
        today,
      }}
    >
      {children}
    </DateSliderContext.Provider>
  );
};
