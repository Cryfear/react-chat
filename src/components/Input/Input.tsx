import React from "react";
import "./Input.scss";

interface InputTypes {
  // не забыть протипизировать
}

export const Input = ({ input, meta, placeholder, type, classes, prefix, id } : any) => {
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
