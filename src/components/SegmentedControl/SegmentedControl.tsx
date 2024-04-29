"use client";

import styles from "./SegmentedControl.module.scss";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  data: { label: string; value: string }[];
  className?: string;
};

const SegmentedControl = forwardRef<HTMLDivElement, Props>(
  function SegmentedControl({ value, onChange, data, className }, ref) {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [controlsRefs, setControlsRefs] = useState<
      Record<string, HTMLButtonElement | null>
    >({});
    const sliderRef = useRef<HTMLDivElement>(null);
    const targetRef = controlsRefs[data.findIndex((d) => d.value === value)];

    const setControlRef = (index: number) => (node: HTMLButtonElement) => {
      controlsRefs[index] = node;
      setControlsRefs(controlsRefs);
    };

    useEffect(() => {
      if (!targetRef || !rootRef) return;

      const targetRect = targetRef.getBoundingClientRect();
      const parentRect = rootRef.getBoundingClientRect();

      const position = {
        left: targetRect.left - parentRect.left,
        width: targetRect.width,
      };

      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(${position.left - 1}px)`;
        sliderRef.current.style.width = `${position.width + 2}px`;
      }
    }, [targetRef, rootRef]);

    useImperativeHandle(ref, () => rootRef as HTMLDivElement);
    return (
      <div
        className={`${styles.segmented_control} ${className}`}
        ref={setRootRef}
      >
        <div className={styles.slider} ref={sliderRef}></div>

        {data.map((d, i) => (
          <React.Fragment key={d.value}>
            <button
              className={`${styles.button} ${value === d.value && styles.button__selected}`}
              onClick={() => onChange(d.value)}
              ref={setControlRef(i)}
            >
              {d.label}
            </button>
            {i !== data.length - 1 && (
              <hr
                className={`${styles.separator} ${(value === d.value || (i < data.length - 1 && data[i + 1].value === value)) && styles.separator__no_right_border}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

export default SegmentedControl;
