import React from "react";
import { Route } from "react-router";
import Messages from "../Messages/Messages";

interface UsersRouterTypes {
  users: any;
  dialogId: String;
}

interface itemTypes {
  id: string;
}

const UsersRoutes = (props: UsersRouterTypes) => {
  return props.users.length > 0
    ? props.users.map((item: itemTypes, index: number) => {
        return (
          <Route
            key={index}
            exact
            path={`/im/${item.id}`}
            render={() => {
              return <Messages user={item} dialogId={props.dialogId} />;
            }}
          />
        );
      })
    : null;
};

export default UsersRoutes;
