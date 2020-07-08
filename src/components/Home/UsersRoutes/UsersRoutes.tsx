import React from "react";
import Header from "../Header/Header";
import MessagesWrapper from "../Messages/MessagesWrapper";
import MessagesInputWrapper from "../Messages/MessagesInputWrapper";
import { UsersRouterTypes } from "../HomeTypes";

const UsersRoutes = (props: UsersRouterTypes) => {
  return (
    <div>
      <Header fullName={props.user.fullName} online={props.user.online} />
      <MessagesWrapper avatar={props.user.avatar} myId={props.myId} messages={props.messages} />
      <MessagesInputWrapper
        createMessage={props.createMessage}
        myId={props.myId}
        dialogId={props.dialogId}
      />
    </div>
  );
};

export default UsersRoutes;
