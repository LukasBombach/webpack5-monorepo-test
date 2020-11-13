import React from "react";
import { Text } from "ink";
import { useExecutionTime } from "./useExecutionTime";
import { useCompilation } from "./useCompilation";

import type { Compiler } from "webpack";
import type { Events } from "../../config";

export interface DeveloplmentCliProps {
  compiler: Compiler;
  events: Events;
}

export const DeveloplmentCli = ({ compiler, events }: DeveloplmentCliProps) => {
  const executionTime = useExecutionTime();
  const compilation = useCompilation(compiler, events);

  if (compilation.isLoading) {
    return <Text color="gray">Initializing Compiler...</Text>;
  }

  if (compilation.isRunning) {
    const percentage = compilation.percentage.padStart(3, " ");
    const message = compilation.message;
    const text = `Compiling... ${percentage}% ${message}`;
    return <Text>{text}</Text>;
  }

  return <Text color="green">Compiled in {executionTime}s</Text>;
};
