import { useEffect, useState } from "react";

/**
 * Types out an array of lines one character at a time, one line after another.
 * Returns the lines typed so far and whether typing has finished.
 */
export function useTypewriter(lines, speed = 20, startDelay = 300) {
  const [displayed, setDisplayed] = useState([]);
  const [done, setDone] = useState(lines.length === 0);

  useEffect(() => {
    if (lines.length === 0) {
      setDisplayed([]);
      setDone(false);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let current = [];
    let timeout;

    const typeChar = () => {
      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIndex];
      charIndex++;
      current = [...current.slice(0, lineIndex), line.slice(0, charIndex)];
      setDisplayed([...current]);

      if (charIndex >= line.length) {
        lineIndex++;
        charIndex = 0;
        timeout = setTimeout(typeChar, speed * 8); // pause between lines
      } else {
        timeout = setTimeout(typeChar, speed);
      }
    };

    timeout = setTimeout(typeChar, startDelay);
    return () => clearTimeout(timeout);
  }, [lines, speed, startDelay]);

  return { lines: displayed, done };
}