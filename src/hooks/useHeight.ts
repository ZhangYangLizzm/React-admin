import { useRef, useState, useLayoutEffect } from "react";
import { debounce } from "lodash-es";

export const useHeight = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [divHeight, setDivHeight] = useState(800);

  useLayoutEffect(() => {
    const div = divRef.current;
    if (div) {
      const { height } = div.getBoundingClientRect();
      setDivHeight(height);
      setTimeout(() => {
        setLoading(false);
      }, 300);

      window.onresize = debounce(() => {
        const { height: newHeight } = div.getBoundingClientRect();
        setDivHeight(newHeight);
      }, 300);
    }

    return () => {
      window.onresize = null;
    };
  }, []);

  return { divRef, loading, divHeight };
};
