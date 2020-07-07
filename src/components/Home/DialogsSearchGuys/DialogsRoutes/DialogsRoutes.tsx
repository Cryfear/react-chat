import React from "react";
import DialogsContainer from "./Routes/DialogsContainer";
import SearchUsersContainer from "./Routes/SearchUsersContainer";
import { DialogsRoutesTypes } from "../../HomeTypes";

const DialogsRoutes = (props: DialogsRoutesTypes) => {
  return !props.isSearch ? (
    // тут лежат диалоги пользователя
    <DialogsContainer getUsers={props.getUsers} page={props.page} />
  ) : (
    // тут происходит поиск пользователей
    <SearchUsersContainer
      getUsers={props.getUsers}
      page={props.page}
      isSearch={props.isSearch}
      users={props.users}
    />
  );
};
export default DialogsRoutes;
