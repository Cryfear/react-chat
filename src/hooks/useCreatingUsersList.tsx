import {UsersSearchItem} from "../components/Home/DialogsLIst/UserDialogs/UsersSearchItem/UsersSearchItem";
import React, {useMemo} from "react";
import {usersType} from "../components/Home/Home.types";

export const useCreatingUsersList = (users: usersType[]) => {
  return useMemo(() => {
    return users && users.length > 0 ? (
      users.map((userData: usersType) => {
        return <UsersSearchItem {...userData} key={userData.id}/>;
      })
    ) : (
      <div/>
    );
  }, [users]);
};
