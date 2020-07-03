import React from "react";
import { Route } from "react-router";
import Messages from "../../components/Home/Messages/Messages";

const UsersRouter = props => {
  return props.users.length > 0 ? (
    props.users.map((item, index) => {
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
  ) : (
    <div>"none"</div>
  );
};

export default UsersRouter;
