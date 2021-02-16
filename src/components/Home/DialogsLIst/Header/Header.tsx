import React from "react";

import "./Header.scss";
import pencil from "../../../../assets/pencil.svg";
import people from "../../../../assets/people.svg";

const Header = () => {
  return (
    <div className="list-header">
      <img src={people} alt="icon" className="list-header__icon" />
      <span>Dialogs List</span>
      <button className="list-header__button">
        <img src={pencil} alt="button" />
      </button>
    </div>
  );
};

export default Header;
