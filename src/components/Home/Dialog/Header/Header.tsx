import React from "react";
import dots from "../../../../assets/dots.svg";
import "./Header.scss";

export const Header = (props: {userName: string | undefined, isOnline: string}) => {
  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        <h3>{props.userName}</h3>
        <p className={props.isOnline}>{props.isOnline}</p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};
