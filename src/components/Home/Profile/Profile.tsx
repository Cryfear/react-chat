import React, { useState } from "react";
import { OpenedProfile } from "./OpenedProfile";
import "./Profile.scss";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="profile__wrapper">
      <button className="profile__show-button" onClick={() => setIsOpen(!isOpen)}>
        ArthurMorphy<span>Show</span>
      </button>

      <OpenedProfile isOpen={isOpen}/>
    </div>
  );
};
