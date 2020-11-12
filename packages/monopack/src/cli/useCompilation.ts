import { useState, useEffect } from "react";
import { useCompiler } from "./useCompiler";

import type { Configuration } from "webpack";

export function useCompilation(config?: Configuration) {
  const { compiler, percentage, message } = useCompiler(config);
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

  return { compiler, isRunning, isDone, percentage, message };
}
