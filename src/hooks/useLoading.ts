import { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

const MINIMUM_LOADING_TIME = 1000;

export default function useLoading(
  min_loading_time = MINIMUM_LOADING_TIME,
  dependencies = [],
) {
  const [loading, setLoading] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const delayPromise = new Promise((resolve) =>
      setTimeout(resolve, min_loading_time),
    );
    const windowSizePromise = new Promise((resolve) => {
      if (width !== undefined && height !== undefined) {
        resolve(null);
      }
    });

    const promises =
      dependencies.length > 0
        ? [delayPromise, ...dependencies]
        : [delayPromise, windowSizePromise];

    Promise.all(promises).then(() => {
      setLoading(false);
    });
  }, [width, height]);

  return loading;
}
