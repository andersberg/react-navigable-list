import React from 'react';

export default function({
  children = null,
  hasFocus = false,
  forwardRef = null,
  ...rest
}) {

  return (
    <button
        ref={forwardRef}
        style={{
          // background: "black",
          background: hasFocus ? "hotpink" : "black",
          color: "white",
          padding: "10px",
          borderRadius: "5px"
          // fontWeight: hasFocus ? 700 : 400,
        }}
        {...rest}
      >
        {children}
      </button>
  )
}