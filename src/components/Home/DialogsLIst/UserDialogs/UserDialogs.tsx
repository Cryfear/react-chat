import React from "react";
import "./UserDialogs.scss";

export const UserDialogs = ({
  isUserSearch,
  Users,
  Dialogs
}: {
  isUserSearch: boolean,
  Users: any, // возникли трудности, попозже
  Dialogs: any
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
