import React, { useState } from "react";
import ReactDOM from "react-dom";
import shortid from "shortid";
import SelectableList from "./NavigableList";
import Button from './Button'
import "./styles.css";

const generateList = (count = 0) =>
  [...Array(count)].map(() => shortid.generate());

function App() {
  const [filter, setFilter] = useState("");
  const [cursor, setCursor] = useState(undefined);
  const list = generateList(filter.length);

  const handleOnChange = ({ target }) => {
    setFilter(target.value);
    setCursor(undefined);
  }

  const handleKeyUp = ({ key, target }) => {
    if (key === "Enter" && target.value === filter) {
      return setCursor(0);
    }
  };

  return (
    <div className="App">
      <input
        onChange={handleOnChange}
        onKeyUp={handleKeyUp}
        value={filter}
        autoFocus
      />
      <SelectableList list={list} cursorIndex={cursor} >
        {({ hasFocus, item, ...rest }) => (
          <Button
            style={{
              background: hasFocus ? "hotpink" : "black",
              color: "white",
              padding: "10px",
              borderRadius: "5px"
            }}
            {...rest}
          >
            Item ({item}) has focus {Boolean(hasFocus).toString()}
          </Button>
        )}
      </SelectableList>
      <Button onClick={() => setFilter("")} style={{ padding: "10px" }}>
        Rensa
      </Button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
  rootElement);
