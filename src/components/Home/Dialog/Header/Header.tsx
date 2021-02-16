import React from "react";

import dots from "../../../../assets/dots.svg";

import "./Header.scss";

const Header = () => {
  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        <h3>Arthur Vladimirovich Morphy</h3>
        <p className={false ? "online" : "offline"}>{false ? "online" : "offline"}</p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};

export default Header;
