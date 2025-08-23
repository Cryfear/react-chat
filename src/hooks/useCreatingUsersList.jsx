import { UsersSearchItem } from "../components/Home/DialogsLIst/UserDialogs/UsersSearchItem/UsersSearchItem";
import React, { useMemo } from "react";

export const useCreatingUsersList = (users) => {
  return useMemo(() => {
    return users && users.length > 0 ? (
      users.map((userData) => {
        return <UsersSearchItem {...userData} key={userData.id} />;
      })
    ) : (
      <div />
    );
  }, [users]);
};
