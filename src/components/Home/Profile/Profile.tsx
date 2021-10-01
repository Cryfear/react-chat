import React from "react";
import "./Profile.scss";

export const Profile = () => {
  return (
    <div className="profile__wrapper">
      <button className="profile__show-button">
        Arthur <span>Click to show</span>
      </button>

      <div className="profile hidden-content">
        <span>Arthur</span>
        <img
          src="https://sun9-8.userapi.com/impg/CDsRtIMBb8z1Zj_ZUaR-cXsKynVsAa5vCr1egg/Vfaolg2sGXU.jpg?size=1080x1350&quality=96&sign=7a53fca993112073fda366beb7210151&type=album"
          alt="profile_photo"
        />
      </div>
    </div>
  );
};
