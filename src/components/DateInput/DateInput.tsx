import { Dayjs } from "dayjs";
import DateInputCalendar from "./DateInputCalendar";
import { DateInputProvider } from "./DateInputContext";
import DateInputTarget from "./DateInputTarget";

interface Props {
  onChange: (value: Dayjs) => void;
  value: Dayjs;
}

export default function DateInput({ onChange, value }: Props) {
  return (
    <DateInputProvider value={value}>
      <DateInputTarget />
      <DateInputCalendar onChange={onChange} />
    </DateInputProvider>
  );
}
