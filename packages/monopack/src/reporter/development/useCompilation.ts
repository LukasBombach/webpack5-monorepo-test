import { useState, useEffect } from "react";

import type { Compiler } from "webpack";
import type { Events } from "../../config";

interface Compilation {
  isLoading: boolean;
  isRunning: boolean;
  isDone: boolean;
  percentage: number;
  message: string;
}

export function useCompilation(
  compiler: Compiler,
  events: Events
): Compilation {
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [percentage, setPercentage] = useState<number>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (compiler.running) return;
    setIsLoading(false);
    compiler.run(() => setIsDone(true));
  });

  useEffect(() => setIsRunning(compiler.running), [compiler.running]);

  useEffect(() => {
    const onProgessHandler = (percentage: number, message: string) => {
      setPercentage(percentage);
      setMessage(message);
    };
    events.on("progress", onProgessHandler);
    return () => events.off("progress", onProgessHandler);
  });

  return { isLoading, isRunning, isDone, percentage, message };
}
