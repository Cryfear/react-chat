import { useStore } from "effector-react";
import React, { useState } from "react";
import { isAuthData } from "../../../App.model";
import { OpenedProfile } from "./OpenedProfile";
import "./Profile.scss";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const authStore = useStore(isAuthData);

  return (
    <div className="profile__wrapper">
      <button className="profile__show-button" onClick={() => setIsOpen(!isOpen)}>
        {authStore.myUserData.name}<span>Show</span>
      </button>

      <OpenedProfile isOpen={isOpen} {...authStore.myUserData}/>
    </div>
  );
};
