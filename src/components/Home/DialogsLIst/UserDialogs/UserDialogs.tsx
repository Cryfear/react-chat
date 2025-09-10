import React from "react";
import "./UserDialogs.scss";

export const UserDialogs = ({
  isUserSearch,
  Users,
  Dialogs
}: {
  isUserSearch: boolean,
  Users: React.ReactNode 
  Dialogs: React.ReactNode
}) => {
  console.log(Users);
  console.log(Dialogs)
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
