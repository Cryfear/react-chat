import React from "react";
import { Button } from "antd";
import "./Button.scss";
import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  classes?: string;
  onSubmit?: any;
}

const TypicalButton = (props: ButtonProps) => {
  return (
    <div className="auth__buttonWrapper">
      <Button
        onClick={props.onSubmit}
        size="large"
        type="primary"
        className={classNames("auth__button", props.classes)}
        {...props}
      ></Button>
    </div>
  );
};

export default TypicalButton;
