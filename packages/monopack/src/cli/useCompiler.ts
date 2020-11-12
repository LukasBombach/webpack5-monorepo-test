import { useState, useEffect } from "react";
import webpack, { ProgressPlugin } from "webpack";
import { getWebpackConfig } from "../config";

import type { Compiler } from "webpack";

export function useCompiler() {
  const [compiler, setCompiler] = useState<Compiler>(null);
  const [percentage, setPercentage] = useState("0");
  const [message, setMessage] = useState<string>();

  const progressPlugin = new ProgressPlugin((percentage, message) => {
    setPercentage((percentage * 100).toFixed());
    setMessage(message);
  });

  useEffect(() => {
    getWebpackConfig([progressPlugin])
      .then(config => webpack(config))
      .then(compiler => setCompiler(compiler));
  }, []);

  return { compiler, percentage, message };
}
