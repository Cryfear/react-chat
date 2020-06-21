import React from "react";
import "./Input.scss";

export const Input = ({ input, meta, placeholder, type, classes, prefix, id }) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className="simpleInput">
      <span className="input__icon">{prefix}</span>
      <input
        id={id}
        {...input}
        name={input.name}
        placeholder={placeholder}
        type={type}
        className={classes + (hasError ? " input-error" : "")}
      />
      {<div className="simpleInput__error">{hasError && meta.error}</div>}
    </div>
  );
};
