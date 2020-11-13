import { useState } from "react";

interface CompilationState {
  isLoading: boolean;
  isRunning: boolean;
  isDone: boolean;
}

const defaultState: CompilationState = {
  isLoading: true,
  isRunning: false,
  isDone: false,
};

export function useCompilationStates(initialState = defaultState) {
  const [state, setState] = useState<CompilationState>(initialState);

  const start = () => {
    setState({ isLoading: false, isRunning: true, isDone: false });
  };

  const end = () => {
    setState({ isLoading: false, isRunning: false, isDone: true });
  };

  return { ...state, start, end };
}
