import { useState, useEffect } from "react";
import { throttle } from "throttle-debounce";

import type { Events } from "../../config";

const progressThrottleRate = 1000 / 24; // 24fps

export function useCompilationProgress(events: Events) {
  const [percentage, setPercentage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onProgessHandler = throttle(
      progressThrottleRate,
      (percentage: number, message: string) => {
        setPercentage((percentage * 100).toFixed());
        setMessage(message);
      }
    );
    events.on("progress", onProgessHandler);
    return () => events.off("progress", onProgessHandler);
  }, []);

  return { percentage, message };
}
