import { useState, useEffect } from "react";
import { useCompiler } from "./useCompiler";

export function useCompilation() {
  const { compiler, isLoading, percentage, message } = useCompiler();
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!compiler || compiler.running) return;
    compiler.run(() => setIsDone(true));
  }, [compiler]);

  useEffect(() => setIsRunning(Boolean(compiler?.running)), [
    compiler,
    compiler?.running,
  ]);

  return { isLoading, isRunning, isDone, percentage, message };
}
