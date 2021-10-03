import classNames from "classnames";
import React from "react";

export const OpenedProfile = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className={classNames(isOpen ? "profile" : "profile hidden-content")}>
      <span>Arthur</span>
      <img
        src="https://sun9-8.userapi.com/impg/CDsRtIMBb8z1Zj_ZUaR-cXsKynVsAa5vCr1egg/Vfaolg2sGXU.jpg?size=1080x1350&quality=96&sign=7a53fca993112073fda366beb7210151&type=album"
        alt="profile_photo"
      />
      <div className="profile__edit-data">Change nickname</div>
      <div className="profile__edit-avatar">Change photo</div>
      <div className="profile__edit-password">Change password</div>
    </div>
  );
};
