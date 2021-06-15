import React from "react";
import DialogItem from "./DialogItem/DialogItem";

import "./UserDialogs.scss";
import UsersSearchItem from "./UsersSearchItem/UsersSearchItem";

const UserDialogs = ({dialogs, users, userSearch}: any) => {
  console.log(users, dialogs);
  const Dialogs = dialogs.map(({avatar, fullName, id, isOnline}: any, index: number) => {
   return <DialogItem avatar={avatar} name={fullName} id={id} isOnline={isOnline} />
  })
  const Users = users.map(({avatar, fullName, id, isOnline}: any, index: number) => {
    return <UsersSearchItem avatar={avatar} name={fullName} id={id} isOnline={isOnline} />
  })
  return (
    <div className="dialogs">
      {userSearch ? Users : Dialogs}
    </div>
  );
};

export default UserDialogs;
