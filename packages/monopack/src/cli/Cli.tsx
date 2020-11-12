import React from "react";
import { Text } from "ink";
import { useConfig } from "./useConfig";
import { useCompilation } from "./useCompilation";
import { useExecutionTime } from "./useExecutionTime";

export const Cli = () => {
  const config = useConfig();
  const compilation = useCompilation(config);
  const executionTime = useExecutionTime();

  if (!compilation.compiler) {
    return <Text color="gray">Initializing Compiler...</Text>;
  }

  if (compilation.isRunning) {
    const text = `Compiling... ${compilation.percentage}% ${compilation.message}`;
    return <Text>{text}</Text>;
  }

  return <Text color="green">Compiled in {executionTime}s</Text>;
};
