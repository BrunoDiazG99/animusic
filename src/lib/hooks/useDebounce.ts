import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay = 800) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
