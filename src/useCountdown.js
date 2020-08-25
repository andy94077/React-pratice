import { useEffect, useState } from "react";

export default function useCountdown(seconds = 0) {
  const [countdown, setCountdown] = useState(seconds);
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    return () => {};
  }, [countdown > 0]);
  return [countdown, setCountdown];
}
