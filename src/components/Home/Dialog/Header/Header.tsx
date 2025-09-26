import React from "react";
import dots from "../../../../assets/dots.svg";
import "./Header.scss";
import { findProfileFx } from "../../UserPage/UserPage.model";
import { Link } from "react-router-dom";

export const Header = (props: { userName: string | undefined, isOnline: string, userId: string }) => {
  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        <Link className="dialog__header__link" to={`/home/profile/:id${props.userId}`}>
          <h3 onClick={() => {
            return findProfileFx(props.userId);
          }}>{props.userName}
          </h3>
        </Link>
        <p className={props.isOnline}>{props.isOnline}</p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};
