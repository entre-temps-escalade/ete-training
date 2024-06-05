import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DateSliderContext } from "./DateSliderContext";
import styles from "./DateSlider.module.scss";
import useWindowSize from "@/hooks/useWindowSize";

// FIXME: small bug on scroll, sometimes when it hits the end, it don't scroll back to bound
const CELL_SIZE = 66;

export default function DateSliderCarousel() {
  const ctx = useContext(DateSliderContext)!;
  const { width } = useWindowSize();

  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const previousXRef = useRef(0);

  const days = useMemo(() => ctx.value.endOf("month").date(), [ctx.value]);
  const isBeggining = useMemo(() => ctx.value.date() < 4, [ctx.value]);
  const isEnd = useMemo(() => ctx.value.date() >= days - 2, [ctx.value, days]);

  useLayoutEffect(() => {
    if (width) {
      setPosition(
        isBeggining
          ? 0
          : isEnd
            ? -(days * CELL_SIZE) + width
            : -(ctx.value.date() - 3) * CELL_SIZE,
      );
    }
  }, [width]);

  const handleTouchStart = (e: React.TouchEvent) => {
    previousXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const clientX = e.touches[0].clientX;
    const offset = clientX - previousXRef.current;
    const maxPosition = -(days + 1) * CELL_SIZE + (width || 0);
    setPosition((prevPosition) => {
      const newPosition = prevPosition + offset;
      return Math.max(maxPosition, Math.min(CELL_SIZE, newPosition));
    });
    previousXRef.current = clientX;
  };

  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) {
      const maxPosition = -days * CELL_SIZE + (width || 0);
      const roundedPosition = Math.round(position / CELL_SIZE) * CELL_SIZE;
      const finalPosition = Math.max(maxPosition, Math.min(0, roundedPosition));
      if (
        Math.round(finalPosition / CELL_SIZE) !==
        Math.round(position / CELL_SIZE)
      ) {
        setPosition(finalPosition);
      }
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

  function handleSelect(i: number) {
    if (!isDragging) ctx.apply("day", i);
  }
  useEffect(() => {
    setPosition(
      isBeggining
        ? 0
        : isEnd
          ? -(days * CELL_SIZE) + (width || 0)
          : -(ctx.value.date() - 3) * CELL_SIZE,
    );
  }, [ctx.value.date()]);

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      style={{
        transform: `translateX(${position}px)`,
      }}
    >
      {[...Array(days)]
        .map((_, i) => i + 1)
        .map((i) => (
          <div
            key={i}
            className={`${styles.day_card} ${i === ctx.value.date() && styles.selected_day}`}
            onClick={() => handleSelect(i)}
          >
            <span>{ctx.value.date(i).format("dd")[0].capitalize()}</span>
            <span>{i}</span>
          </div>
        ))}
    </div>
  );
}
