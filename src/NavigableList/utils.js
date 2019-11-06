import React, { useState } from "react";

export function useMultipleKeysPressed(
  targetkeys = null,
  shouldPreventDefault = false
) {
  targetkeys = Array.isArray(targetkeys) ? targetkeys : Array.of(targetkeys);
  const initialState = new Array(targetkeys.length).fill(false);
  const [keysPressed, setKeysPressed] = useState(initialState);

  const downHandler = event => {
    // console.log("shouldPreventDefault", shouldPreventDefault(event.key));

    // if (shouldPreventDefault(event.key)) event.preventDefault();

    setKeysPressed(prevState =>
      targetkeys.reduce((prevState, target, index) => {
        if (target === event.key) {
          prevState[index] = true;
        }
        return prevState;
      }, prevState)
    );
  };

  const upHandler = event => {
    // console.log("shouldPreventDefault", shouldPreventDefault(event.key));

    // if (shouldPreventDefault(event.key)) event.preventDefault();

    setKeysPressed(prevState =>
      targetkeys.reduce((prevState, target, index) => {
        if (target === event.key) {
          prevState[index] = false;
        }
        return prevState;
      }, prevState)
    );
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
  console.log("keysPressed", keysPressed);

  return keysPressed.every(value => value === true);
}

export function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };

  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });

  return keyPressed;
}

export function getNextIndex(index, maxValue = null) {
  // const index = array.indexOf(value);
  console.log("getNextIndex", index, index + 1);
  if (typeof index === "undefined") return index;
  return maxValue && maxValue === index + 1 ? maxValue : index + 1;
}

export function getPrevIndex(index) {
  // const index = array.indexOf(value);
  console.log("getPrevIndex", index);
  if (typeof index === "undefined") return index;
  return index - 1 < 0 ? index : index - 1;
}
