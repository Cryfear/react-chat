import React from "react";

import dots from "../../../../assets/dots.svg";

import "./Header.scss";

import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";

interface UserDataTypes {
  fullName: string;
  online: boolean;
}

const updateAuth = createEvent<UserDataTypes>();

const updateStore = (state: UserDataTypes, data: UserDataTypes): UserDataTypes => {
  return { ...state, online: data.online, fullName: data.fullName };
};

const isAuthData = createStore({
  fullName: "Arthur Morphy",
  online: true,
}).on(updateAuth, updateStore);

isAuthData.watch(console.log);

export const Header = () => {
  const { fullName, online } = useStore(isAuthData);
  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        <h3 onClick={() => updateAuth({ online, fullName: "Wow Switched" })}>{fullName}</h3>
        <p
          onClick={() => updateAuth({ online: !online, fullName })}
          className={online ? "online" : "offline"}
        >
          {online ? "online" : "offline"}
        </p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};
