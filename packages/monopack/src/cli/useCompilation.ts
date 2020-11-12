import { useState, useEffect } from "react";
import { useCompiler } from "./useCompiler";

export function useCompilation() {
  const { compiler, isLoading, percentage, message } = useCompiler();
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!compiler || compiler.isRunning()) return;
    if (isRunning) return;
    setIsRunning(true);
    compiler
      .run()
      .then(() => setIsRunning(false))
      .then(() => setIsDone(true));
  }, [compiler, isRunning]);

  return { isLoading, isRunning, isDone, percentage, message };
}
