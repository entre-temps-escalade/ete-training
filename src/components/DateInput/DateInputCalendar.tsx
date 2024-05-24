import useWindowSize from "@/hooks/useWindowSize";
import { useContext, useLayoutEffect, useState } from "react";
import { DateInputContext } from "./DateInputContext";
import styles from "./DateInput.module.scss";
import Icon from "../Icon/Icon";
import "@theo-posty/betterjs";
import Button from "../Button/Button";
import { Dayjs } from "dayjs";
import React from "react";

interface Props {
  position?: "top" | "bottom";
  onChange: (value: Dayjs) => void;
}

interface Position {
  top: number;
  left: number;
}

export default function DateInputCalendar({
  position = "bottom",
  onChange,
}: Props) {
  const [calendarRef, setCalendarRef] = useState<HTMLDivElement | null>(null);
  const [_position, _setPosition] = useState<Position>();
  const { height: windowHeight, width: windowWidth } = useWindowSize();
  const ctx = useContext(DateInputContext)!;
  const [display, setDisplay] = useState<"day" | "month" | "year">("day");

  useLayoutEffect(() => {
    if (!ctx.targetRef || !calendarRef || !windowHeight || !windowWidth) return;

    const targetRect = ctx.targetRef.getBoundingClientRect();
    const dropdownHeight = calendarRef.getBoundingClientRect().height;
    const dropdownWidth = calendarRef.getBoundingClientRect().width;

    let top = 0;
    let left = 0;

    if (position === "top") {
      if (
        targetRect.top > dropdownHeight + 10 ||
        windowHeight - targetRect.bottom < dropdownHeight + 10
      ) {
        top = targetRect.top - dropdownHeight - 10;
      } else {
        top = targetRect.bottom + 10;
      }
    } else {
      if (
        windowHeight - targetRect.bottom > dropdownHeight + 10 ||
        targetRect.top < dropdownHeight + 10
      ) {
        top = targetRect.bottom + 10;
      } else {
        top = targetRect.top - dropdownHeight - 10;
      }
    }

    if (targetRect.left + dropdownWidth > windowWidth) {
      left =
        targetRect.left - (targetRect.left + dropdownWidth - windowWidth + 10);
    } else {
      left = targetRect.left;
    }

    _setPosition({ top, left });

    function handleOutsideClick(e: MouseEvent) {
      if (!e.target) return;

      if (
        !calendarRef?.contains(e.target as Node) &&
        !ctx?.targetRef?.contains(e.target as Node)
      ) {
        setDisplay("day");
        ctx.resetCurrentDay();
        ctx.close();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [calendarRef, position, ctx, windowHeight]);

  function changeDisplay() {
    setDisplay((display) => (display === "day" ? "month" : "year"));
  }

  return (
    <div
      ref={setCalendarRef}
      className={`${styles.dateinput_modal} ${ctx.opened && styles.dateinput_modal__opened}`}
      style={{ top: _position?.top, left: _position?.left }}
    >
      <div className={styles.calendar_header}>
        <Button
          onClick={
            display === "day"
              ? ctx.prevMonth
              : display === "month"
                ? ctx.prevYear
                : ctx.prevDecade
          }
        >
          <Icon.AngleLeft />
        </Button>
        <Button onClick={changeDisplay} className={styles.button_grow}>
          {display === "day"
            ? ctx.currentDay.format("MMMM YYYY").capitalize()
            : display === "month"
              ? ctx.currentDay.format("YYYY")
              : `${10 * Math.floor(parseInt(ctx.currentDay.format("YYYY")) / 10)} - ${10 * Math.ceil(parseInt(ctx.currentDay.format("YYYY")) / 10)}`}
        </Button>
        <Button
          onClick={
            display === "day"
              ? ctx.nextMonth
              : display === "month"
                ? ctx.nextYear
                : ctx.nextDecade
          }
        >
          <Icon.AngleRight />
        </Button>
      </div>
      {display === "day" ? (
        <table className={styles.dateinput_calendar}>
          <thead>
            <tr>
              {[...Array(7)].map((_, d) => (
                <th key={d}>
                  {ctx.value.weekday(d).format("dd").capitalize()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ctx.days.map((w, i) => (
              <tr key={i}>
                {w.map((d, i) => (
                  <td key={i}>
                    <Button
                      onClick={() => {
                        onChange(d);
                        ctx.close();
                      }}
                      className={
                        ctx.currentDay.month() !== d.month()
                          ? styles.other_month
                          : d.format("YYYYMMDD") ===
                              ctx.value.format("YYYYMMDD")
                            ? styles.current_day
                            : d.day() == 6 || d.day() == 0
                              ? styles.weekend_day
                              : ""
                      }
                    >
                      {d.date()}
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : display === "month" ? (
        <table className={styles.dateinput_month}>
          <tbody>
            {[...Array(4)].map((_, i) => {
              return (
                <tr key={i}>
                  {[...Array(3)].map((_, m) => {
                    m = i * 3 + m;
                    return (
                      <td key={m}>
                        <Button
                          onClick={() => {
                            ctx.changeCurrentMonth(m);
                            setDisplay("day");
                          }}
                        >
                          {ctx.value.month(m).format("MMM").capitalize()}
                        </Button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <table className={styles.dateinput_month}>
          <tbody>
            {[...Array(4)].map((_, i) => {
              return (
                <tr key={i}>
                  {[...Array(3)].map((_, y) => {
                    y = i * 3 + y;
                    const year =
                      10 *
                        Math.floor(
                          parseInt(ctx.currentDay.format("YYYY")) / 10,
                        ) +
                      y;
                    if (y < 10) {
                      return (
                        <td key={y}>
                          <Button
                            onClick={() => {
                              ctx.changeCurrentYear(year);
                              setDisplay("month");
                            }}
                          >
                            {year}
                          </Button>
                        </td>
                      );
                    } else {
                      return <React.Fragment key={y}></React.Fragment>;
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
