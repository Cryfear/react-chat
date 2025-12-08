import React from "react";
import dots from "../../../../assets/dots.svg";
import "./Header.scss";
import { findProfileFx } from "../../UserPage/UserPage.model";
import { Link } from "react-router-dom";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../Home.model";

export const Header = () => {
  const store = useUnit($HomeStore);

  let fullName, id: any, isOnline;

  if (store.currentUser) {
    fullName = store.currentUser.fullName;
    id = store.currentUser.id;
    isOnline = store.currentUser.isOnline;
  }

  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        <Link className="dialog__header__link" to={`/profile/${id || "null"}`}>
          <h3
            onClick={() => {
              return findProfileFx(id);
            }}
          >
            {fullName || "null"}
          </h3>
        </Link>
        <p className={isOnline ? 'online' : 'offline'}>{isOnline ? 'online' : 'offline'}</p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};
