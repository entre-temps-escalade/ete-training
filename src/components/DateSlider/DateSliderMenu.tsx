import { useContext, useEffect, useRef, useState } from "react";
import styles from "./DateSlider.module.scss";
import dayjs from "dayjs";
import { DateSliderContext } from "./DateSliderContext";

interface Props {
  type: "month" | "year";
  reset: boolean;
  changeReset: React.Dispatch<React.SetStateAction<boolean>>;
}

const CELL_SIZE = 50;

export default function DateSliderMenu({ type, reset, changeReset }: Props) {
  const ctx = useContext(DateSliderContext)!;

  const value = ctx.value[type]();
  const offset = type === "month" ? 0 : -dayjs().year() + 10;
  const initialPosition = (-value - offset) * CELL_SIZE;

  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const previousYRef = useRef(0);
  const qty = type === "month" ? 12 : 21;

  const handleTouchStart = (e: React.TouchEvent) => {
    previousYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const clientY = e.touches[0].clientY;
    const newOffset = clientY - previousYRef.current;
    const maxPosition = -qty * CELL_SIZE;
    setPosition((prevPosition) => {
      const newPosition = prevPosition + newOffset;
      return Math.max(maxPosition, Math.min(CELL_SIZE, newPosition));
    });
    previousYRef.current = clientY;
  };

  const handleTouchEnd = () => setIsDragging(false);

  function handleSelect(i: number) {
    if (!isDragging) {
      setPosition(-i * CELL_SIZE);
      ctx.apply(type, i);
    }
  }

  useEffect(() => {
    if (reset) {
      setPosition(initialPosition);
      changeReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (!isDragging) {
      const maxPosition = -(qty - 1) * CELL_SIZE;
      const roundedPosition = Math.round(position / CELL_SIZE) * CELL_SIZE;
      const finalPosition = Math.max(maxPosition, Math.min(0, roundedPosition));
      setPosition(finalPosition);
    }
  }, [isDragging]);

  useEffect(() => {
    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div className={styles.date_picker}>
      <div className={styles.drag_dealer} onTouchStart={handleTouchStart}>
        <ul
          className={styles.handle}
          style={{ transform: `translateY(${position}px)` }}
        >
          {[...Array(qty)].map((_, i) => (
            <li
              key={i}
              onClick={() => handleSelect(i)}
              className={`${
                ctx.value[type]() ===
                  (type === "month"
                    ? i
                    : dayjs()
                        .year(dayjs().year() + i - 10)
                        .year()) && styles.selected
              }`}
            >
              {type === "month"
                ? dayjs().month(i).format("MMMM").capitalize()
                : dayjs()
                    .year(dayjs().year() + i - 10)
                    .format("YYYY")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
