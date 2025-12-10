import React from "react";
import "./Header.scss";
import pencil from "../../../../assets/pencil.svg";
import people from "../../../../assets/people.svg";
import { Profile } from "../../Profile/Profile";
import { useUnit } from "effector-react";
import { $AppStore } from "../../../../store/App.model";
import { changeUserSearch } from "../UserDialogs/UserDialogsContainer";
import { UsersLoaderFx } from "../../../../store/UsersList.model";

export const Header = () => {
  const appStore = useUnit($AppStore);

  return (
    <div className="list-header">
      <img src={people} alt="icon" className="list-header__icon" />
      <span>Dialogs List</span>
      {appStore.isMobileVersion ? <span>|</span> : null}
      {appStore.isMobileVersion ? (
        <span>
          <Profile />
        </span>
      ) : null}
      <button
        onClick={() => {
          UsersLoaderFx(0);
          changeUserSearch();
        }}
        className="list-header__button"
      >
        <img src={pencil} alt="button" />
      </button>
    </div>
  );
};
