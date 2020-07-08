import React from "react";
import { Route } from "react-router";
import UsersRoutes from "../UsersRoutes/UsersRoutes";
import { connect } from "react-redux";
import { getMessagesAction, createMessageAction } from "../../../redux/home-reducer";
import { MessagesTypes } from "../HomeTypes";

interface itemTypes {
  id: string;
}

class Messages extends React.Component<MessagesTypes> {
  componentDidMount() {
    if (this.props.dialogId) {
      this.props.getMessagesAction(this.props.dialogId, this.props.myId);
    }
  }
  render() {
    return this.props.users.length > 0
      ? this.props.users.map((item: itemTypes, index: number) => {
          return (
            <Route
              key={index}
              exact
              path={`/im/${item.id}`}
              render={() => {
                return (
                  <UsersRoutes
                    createMessage={this.props.createMessageAction}
                    myId={this.props.myId}
                    messages={this.props.messages}
                    user={item}
                    dialogId={this.props.dialogId}
                  />
                );
              }}
            />
          );
        })
      : null;
  }
}

const mapStateToProps = (state: Storage) => ({
  users: state.home.users,
  dialogId: state.home.activeDialog,
  myId: state.login.id,
  messages: state.home.messages,
});

export default connect(mapStateToProps, { getMessagesAction, createMessageAction })(Messages);
