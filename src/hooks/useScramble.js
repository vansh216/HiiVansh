import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#";

/**
 * Resolves `text` out of random characters once `trigger` becomes true —
 * used for the "compiling in" name reveal in the hero.
 */
export function useScramble(text, trigger, speed = 24) {
  const [output, setOutput] = useState(trigger ? "" : text);

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;

    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;
      if (iteration >= text.length) {
        setOutput(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [trigger, text, speed]);

  return output;
}