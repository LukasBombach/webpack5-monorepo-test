import React, { useState, useEffect } from "react";
import { Text } from "ink";
import { getCompiler } from "./compiler";
import { getWebpackConfig } from "./config";

import type { Compiler } from "./compiler";

function useCompiler() {
  const [compiler, setCompiler] = useState<Compiler>(null);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    setLog([...log, "Loading compiler..."]);
    getWebpackConfig()
      .then(config => getCompiler(config))
      .then(compiler => setCompiler(compiler));
  }, []);

  useEffect(() => {
    if (!compiler) return;
    setLog([...log, "Got a compiler, now compiling"]);
    compiler.run().then(() => {
      setLog([...log, "done 🎉"]);
    });
  }, [compiler]);

  return { compiler, log };
}

const Log = ({ messages = [] }: { messages?: string[] }) => {
  return (
    <>
      {messages.map(message => (
        <Text color="grey">{message}</Text>
      ))}
    </>
  );
};

export const MonopackCli = () => {
  const { log } = useCompiler();

  return (
    <>
      <Log messages={log} />
    </>
  );
};
