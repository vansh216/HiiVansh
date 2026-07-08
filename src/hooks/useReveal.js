import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean that flips to true once the element
 * scrolls into the viewport. Used to trigger animations on scroll
 * instead of on mount.
 */
export function useReveal(threshold = 0.3) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}