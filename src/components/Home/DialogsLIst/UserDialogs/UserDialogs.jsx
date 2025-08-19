import React from "react";
import "./UserDialogs.scss";

export const UserDialogs = ({
  isUserSearch,
  Users,
  Dialogs,
}) => {
  return (
    <div className="dialogs">
      {isUserSearch ? (
        Users ? (
          Users
        ) : (
          <div></div>
        )
      ) : Dialogs ? (
        Dialogs
      ) : (
        <div></div>
      )}
    </div>
  );
};
