import React from "react";
import { Text } from "ink";
import { useCompilation } from "./useCompilation";
import { useExecutionTime } from "./useExecutionTime";

export const Cli = () => {
  const compilation = useCompilation();
  const executionTime = useExecutionTime();

  if (compilation.isLoading) {
    return <Text color="gray">Initializing Webpack...</Text>;
  }

  if (compilation.isRunning) {
    const text = `Compiling... ${compilation.percentage}% ${compilation.message}`;
    return <Text>{text}</Text>;
  }

  return <Text color="green">Compiled in {executionTime}s</Text>;
};
