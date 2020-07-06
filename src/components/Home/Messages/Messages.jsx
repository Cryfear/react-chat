import React from "react";
import Header from "../Header/Header";
import MessagesWrapper from "./MessagesWrapper";
import MessagesInputWrapper from "./MessagesInputWrapper";
import { MessagesApi } from "../../../api/api";

class Messages extends React.Component {
  messages = {};
  componentDidMount() {
    MessagesApi.getDialogMessages(this.props.user.id, sessionStorage["userId"]).then(data => {
      this.messages = data;
    });
  }
  render() {
    return (
      <div className="messages">
        <Header fullName={this.props.user.fullName} online={this.props.user.online} />
        <MessagesWrapper messages={this.messages.data} />
        <MessagesInputWrapper dialogId={this.props.dialogId} />
      </div>
    );
  }
}
export default Messages;
