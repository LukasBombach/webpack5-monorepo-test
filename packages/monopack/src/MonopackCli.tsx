import React, { useState, useEffect } from "react";
import { ProgressPlugin } from "webpack";
import { Text } from "ink";
import { getCompiler } from "./compiler";
import { getWebpackConfig } from "./config";

import type { Compiler } from "./compiler";

function useCompiler() {
  const [compiler, setCompiler] = useState<Compiler>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState("0");
  const [message, setMessage] = useState<string>();

  const progressPlugin = new ProgressPlugin((percentage, message) => {
    setPercentage((percentage * 100).toFixed());
    setMessage(message);
  });

  useEffect(() => {
    setIsLoading(true);
    getWebpackConfig([progressPlugin])
      .then(config => getCompiler(config))
      .then(compiler => setCompiler(compiler))
      .then(() => setIsLoading(false));
  }, []);

  return { compiler, isLoading, percentage, message };
}

function useCompilation() {
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

export const MonopackCli = () => {
  const [startTime, setStartTime] = useState<[number, number]>();
  const [executionTime, setExecutionTime] = useState<string>();
  const {
    isLoading,
    isRunning,
    isDone,
    percentage,
    message,
  } = useCompilation();

  useEffect(() => {
    if (!startTime) {
      setStartTime(process.hrtime());
      return;
    }
    if (startTime && !executionTime && !isDone) {
      const endTime = process.hrtime(startTime);
      const seconds = endTime[0];
      const milliSeconds = Math.round(endTime[1] / 100000);
      setExecutionTime(`${seconds}.${milliSeconds}`);
      return;
    }
  }, [startTime, executionTime, isDone]);

  if (isLoading) {
    return <Text color="gray">Initializing Webpack...</Text>;
  }

  if (isRunning) {
    const text = `Compiling... ${percentage}% ${message}`;
    return <Text>{text}</Text>;
  }

  return <Text color="green">Compiled in {executionTime}s</Text>;
};
