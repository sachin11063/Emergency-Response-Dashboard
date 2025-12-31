import { useEffect, useState } from "react";

function Counter({ value, duration = 600 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = Math.max(1, Math.floor(value / (duration / 16)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplay(start);
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <>{display}</>;
}

export default Counter;
