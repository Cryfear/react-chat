import React from "react";
import { Button } from "antd";
import "./Button.scss";
import classNames from "classnames";

interface ButtonProps {
  children: string;
  classes: string;
}

const TypicalButton = (props: ButtonProps) => (
  <div className="auth__buttonWrapper">
    <Button
      size="large"
      type="primary"
      className={classNames("auth__button", props.classes)}
      {...props}
    ></Button>
  </div>
);

export default TypicalButton;
