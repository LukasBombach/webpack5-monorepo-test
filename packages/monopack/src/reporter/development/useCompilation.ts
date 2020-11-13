import { useState, useEffect } from "react";

import type { Compiler } from "webpack";

interface Compilation {
  isLoading: boolean;
  isRunning: boolean;
  isDone: boolean;
  percentage: number;
  message: string;
}

export function useCompilation(compiler: Compiler): Compilation {
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (compiler.running) return;
    setIsLoading(false);
    compiler.run(() => setIsDone(true));
  });

  useEffect(() => setIsRunning(compiler.running), [compiler.running]);

  return { isLoading, isRunning, isDone, percentage, message };
}
