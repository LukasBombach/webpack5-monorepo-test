import { useState, useEffect } from "react";

export function useExecutionTime() {
  const [startTime, setStartTime] = useState<[number, number]>();
  const [executionTime, setExecutionTime] = useState<string>();

  useEffect(() => {
    if (!startTime) setStartTime(process.hrtime());
  });

  useEffect(() => {
    if (startTime) {
      const endTime = process.hrtime(startTime);
      const seconds = endTime[0];
      const milliSeconds = Math.round(endTime[1] / 100000);
      setExecutionTime(`${seconds}.${milliSeconds}`);
    }
  }, [startTime, executionTime]);

  return executionTime;
}
