import React, { useEffect, useRef, useState } from "react";
import { useKeyPress } from "./utils";

export default function({ children, cursorIndex, list, ...rest }) {
  const elements = useRef([]);
  const [cursor, setCursor] = useState(cursorIndex);
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");

  useEffect(() => {
    elements.current = list.map((item, index) => elements.current[index]);
  }, [list])

  useEffect(() => {
    downPress && setCursor(prevState => (prevState < (elements.current.length -1) ? prevState + 1 : prevState))
  }, [downPress]);

  useEffect(() => {
    upPress && setCursor(prevState => (prevState > 0 ? prevState - 1 : 0));
  }, [upPress]);

  useEffect(() => {
    setCursor(cursorIndex)
  }, [cursorIndex]);

  useEffect(() => {
    setFocusOnElement(cursor); 
  }, [cursor])  

  const onBlur = (index) => setCursor(undefined);

  const onFocus = (index) => setCursor(index);

  const setFocusOnElement = index => elements.current[index] && elements.current[index].focus();

  const onClick = index => {
    setFocusOnElement(index);
    setCursor(index);
  };
  
  return (
    <ul className="selectable-list">
      {list.map((item, index) => (
        <li
          key={item}
          className="selectable-list__item"
          onClick={event => onClick(index)}
        >
          {React.Children.only(children({
            className: cursor === index ? "selectable-list__child--active" : "selectable-list__child",
            forwardRef: element => elements.current[index] = element,
            hasFocus: cursor === index,
            item,
            onBlur: (index === 0 || index === (list.length - 1)) ? event => onBlur(index) : null,
            onFocus: event => onFocus(index),
          }))}
        </li>
      ))}
    </ul>
  );
}
