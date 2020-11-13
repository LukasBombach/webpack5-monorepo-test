import React from "react";
import { Text } from "ink";
import { useExecutionTime } from "./useExecutionTime";
import { useCompilation } from "./useCompilation";

import type { Compiler } from "webpack";

export interface DeveloplmentCliProps {
  compiler: Compiler;
}

export const DeveloplmentCli = ({ compiler }: DeveloplmentCliProps) => {
  const executionTime = useExecutionTime();
  const compilation = useCompilation(compiler);

  if (!compilation.isLoading) {
    return <Text color="gray">Initializing Compiler...</Text>;
  }

  if (compilation.isRunning) {
    const percentage = compilation.percentage.toString().padLeft(3, " ");
    const message = compilation.message;
    const text = `Compiling... ${percentage}% ${message}`;
    return <Text>{text}</Text>;
  }

  return <Text color="green">Compiled in {executionTime}s</Text>;
};
