import React from "react";

const Header = (props: any) => {
  return (
    <div className="messages__header">
      <div className="messages__header-wrapper">
        <div className="messages__header-name">{props.fullName}</div>
        <div className={props.online ? "messages__header-online" : "messages__header-ofline"}>
          {props.online ? "онлайн" : "офлайн"}
        </div>
      </div>
      <div className="messages__header-settings"></div>
    </div>
  );
};

export default Header;
