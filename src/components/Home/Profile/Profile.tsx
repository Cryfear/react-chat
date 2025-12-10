import { useUnit } from "effector-react";
import React, { useState } from "react";
import { OpenedProfile } from "./OpenedProfile";
import "./Profile.scss";
import {$LoginStore} from "../../../store/Login.model";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const authStore = useUnit($LoginStore);

  return (
    <div className="profile__wrapper">
      <button className="profile__show-button" onClick={() => setIsOpen(!isOpen)}>
        {authStore.myUserData.name}<span>Show</span>
      </button>

      <OpenedProfile isOpen={isOpen} {...authStore.myUserData}/>
    </div>
  );
};
