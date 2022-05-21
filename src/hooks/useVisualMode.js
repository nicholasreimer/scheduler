import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode((prev) => newMode);
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => replaceHistory);
    } else {
      setMode((prev) => newMode);
      let newHistory = [...history];
      newHistory.push(newMode);
      setHistory((prev) => newHistory);
    }
  };

  //--------------------------------
  function back() {
    let newHistory = [...history];
    newHistory.pop(mode);
    setHistory((prev) => newHistory);
    if (history.length > 1) {
      setMode((prev) => newHistory[newHistory.length - 1]);
    }
  }

  return { mode, transition, back };
}

/*
Create a transition function within useVisualMode that will take in a new mode and 
update the mode state with the new value. If we used useState to initialize the mode 
state in useVisualMode, what will we have to do to update the mode value?
*/
