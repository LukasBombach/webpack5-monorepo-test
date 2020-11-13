import React from "react";
import { Text } from "ink";
import { useExecutionTime } from "./useExecutionTime";

import type { Compiler } from "webpack";

export interface DeveloplmentCliProps {
  compiler: Compiler;
}

export const DeveloplmentCli = ({ compiler }: DeveloplmentCliProps) => {
  const executionTime = useExecutionTime();
  const { isRunning, percentage, message } = useCompilation(compiler);

  if (isRunning) {
    const text = `Compiling... ${percentage.padLeft(3, " ")}% ${message}`;
    return <Text>{text}</Text>;
  }

  return <Text color="green">Compiled in {executionTime}s</Text>;
};
