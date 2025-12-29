import { useUnit } from "effector-react";
import { useState } from "react";
import { OpenedProfile } from "./OpenedProfile";
import "./Profile.scss";
import { $LoginStore } from "@stores/Login.model";

export const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { myUserData } = useUnit($LoginStore);

  return (
    <div className="profile__wrapper">
      <button className="profile__show-button" onClick={() => setIsOpen(!isOpen)}>
        {myUserData.name}
        <span>Show</span>
      </button>

      <OpenedProfile isOpen={isOpen} {...myUserData} />
    </div>
  );
};
