import { useState, useEffect } from "react";
import { ProgressPlugin } from "webpack";
import { getCompiler } from "../compiler";
import { getWebpackConfig } from "../config";

import type { Compiler } from "../compiler";

export function useCompiler() {
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
