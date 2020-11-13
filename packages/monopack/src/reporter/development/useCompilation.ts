import { useState, useEffect } from "react";
import { throttle } from "throttle-debounce";

import type { Compiler } from "webpack";
import type { Events } from "../../config";

interface Compilation {
  isLoading: boolean;
  isRunning: boolean;
  isDone: boolean;
  percentage: string;
  message: string;
}

const progressThrottleRate = 1000 / 24; // 24fps

export function useCompilation(
  compiler: Compiler,
  events: Events
): Compilation {
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [percentage, setPercentage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (compiler.running) return;
    setIsLoading(false);
    compiler.run(() => setIsDone(true));
  });

  useEffect(() => setIsRunning(compiler.running), [compiler.running]);

  useEffect(() => {
    const onProgessHandler = throttle(
      progressThrottleRate,
      (percentage: number, message: string) => {
        setPercentage((percentage * 100).toFixed());
        setMessage(message);
      }
    );
    events.on("progress", onProgessHandler);
    return () => events.off("progress", onProgessHandler);
  }, []);

  return { isLoading, isRunning, isDone, percentage, message };
}
