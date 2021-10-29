import React from "react";
import "./UserDialogs.scss";

type UserDialogsTypes = {
  isUserSearch: boolean;
  Users: JSX.Element | JSX.Element[];
  Dialogs: JSX.Element | JSX.Element[];
};

export const UserDialogs = ({
  isUserSearch,
  Users,
  Dialogs,
}: UserDialogsTypes) => {
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
