// USE VISUAL MODE HOOK:
//-------------------------------------------------------------------------------------------------------------
// IMPORTS:
import { useState } from "react";

//-------------------------------------------------------------------------------------------------------------
// -this custom hook decides whether a component shows or does not show based on its state
// -it returns an object contaiing: the state of mode, a function within our hook called transition, and a
//  func within our hook called back()
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);

  const [history, setHistory] = useState([initial]);

  //------------------------------------------------------------------------------------------------------------
  // TRANSITION FUNC:
  // the transition func (within the hook) allows us to add a MODE to the history array
  // if replcae is truthy then we replace the MODE currently within the history array with the value passed as newMode
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

  //-------------------------------------------------------------------------------------------------------------
  // BACK FUNC:
  // -the back func (within the hook) allows us to remove the last MODE from the history array (always from the end)
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
