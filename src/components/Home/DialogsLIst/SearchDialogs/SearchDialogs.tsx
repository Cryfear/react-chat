import React from "react";

import "./SearchDialogs.scss";
import loop from "../../../../assets/loop.svg";

export const SearchDialogs = () => {
  return (
    <div className="dialogs-search">
      <div className="dialogs-search__wrapper">
        <img src={loop} alt="" />
        <input type="text" placeholder="Search people..." />
      </div>
    </div>
  );
};
