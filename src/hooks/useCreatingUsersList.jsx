import { UsersSearchItem } from "../components/Home/DialogsLIst/UserDialogs/UsersSearchItem/UsersSearchItem";
import { ItemTypes } from "../components/Home/DialogsLIst/UserDialogs/UserDialogsContainer";
import React, { useMemo } from "react";

export const useCreatingUsersList = (users: ItemTypes[]) => {
  return useMemo(() => {
    return users && users.length > 0 ? (
      users.map((userData: ItemTypes) => {
        return <UsersSearchItem {...userData} key={userData.id} />;
      })
    ) : (
      <div />
    );
  }, [users]);
};
