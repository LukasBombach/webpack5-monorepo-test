import { useState, useEffect } from "react";

export function useExecutionTime() {
  const [start, setStart] = useState<bigint>();
  const [exectutionTime, setExectutionTime] = useState<number>();

  useEffect(() => {
    if (start) return;
    setStart(process.hrtime.bigint());
  }, []);

  useEffect(() => {
    if (!start || exectutionTime) return;
    const execTime = process.hrtime.bigint() - start;
    const execTimeInSeconds = parseInt((execTime / 10000000n).toString()) / 100;
    setExectutionTime(execTimeInSeconds);
  }, [start, exectutionTime]);

  return exectutionTime;
}
