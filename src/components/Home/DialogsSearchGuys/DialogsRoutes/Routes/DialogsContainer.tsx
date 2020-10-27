import React from "react";
import DialogItem from "../DialogItem/DialogItem";
import { DialogsTypes } from "../../../HomeTypes";
import SearchInput from "./SearchInput/SearchInput";
import {
  getMyDialogs,
  setSearchPageAction,
} from "../../../../../redux/home-reducer";
import { connect } from "react-redux";

class Dialogs extends React.Component<DialogsTypes> {
  wrapperRef: any = React.createRef();

  componentDidMount() {
    this.props.getMyDialogs(this.props.id);
  }

  render() {
    let dialogs = this.props.myDialogs.map((item: any, index: number) => {
      console.log(item);
      return (
        <DialogItem
          avatar={item.partner[0].avatar}
          username={item.partner[0].fullName}
          isOnline={item.partner[0].isOnline}
          date={item.messages[0][0].date}
          lastMessage={item.messages[0][0].data}
          unreadedCount={2}
          key={index}
        />
      );
    });

    return (
      <div className="dialogs__items-wrapper" ref={this.wrapperRef}>
        <SearchInput />
        {dialogs}
      </div>
    );
  }
}

const mapStateToProps = (state: Storage) => ({
  users: state.home.users,
  id: state.login.id,
  myDialogs: state.home.myDialogs,
});

export default connect(mapStateToProps, {
  getMyDialogs,
  setSearchPageAction,
})(Dialogs);
