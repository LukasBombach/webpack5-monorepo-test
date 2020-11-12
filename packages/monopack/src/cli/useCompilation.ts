import { useState, useEffect } from "react";
import { useCompiler } from "./useCompiler";

export function useCompilation() {
  const { compiler, percentage, message } = useCompiler();
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const isLoading = compiler === null;

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
