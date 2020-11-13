import { useEffect } from "react";
import { useCompilationState } from "./useCompilationState";
import { useCompilationProgress } from "./useCompilationProgress";

import type { Compiler } from "webpack";
import type { Events } from "../../config";

interface Compilation {
  isLoading: boolean;
  isRunning: boolean;
  isDone: boolean;
  percentage: string;
  message: string;
}

export function useCompilation(
  compiler: Compiler,
  events: Events
): Compilation {
  const { isLoading, isRunning, isDone, start, end } = useCompilationState();
  const { percentage, message } = useCompilationProgress(events);

  useEffect(() => {
    if (compiler.running || isDone) return;
    start();
    compiler.run(() => end());
  }, [isDone, compiler.running]);

  return { isLoading, isRunning, isDone, percentage, message };
}
