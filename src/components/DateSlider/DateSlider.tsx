import { Dayjs } from "dayjs";
import { DateSliderProvider } from "./DateSliderContext";
import DateSliderButtons from "./DateSliderButtons";
import DateSliderCarousel from "./DateSliderCarousel";

interface Props {
  onChange: (value: Dayjs) => void;
  value: Dayjs;
}

export default function DateSlider({ value, onChange }: Props) {
  return (
    <DateSliderProvider value={value} onChange={onChange}>
      <DateSliderButtons />
      <DateSliderCarousel />
    </DateSliderProvider>
  );
}
