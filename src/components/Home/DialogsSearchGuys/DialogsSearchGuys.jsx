import React from "react";
import DialogItem from "../../DialogItem/DialogItem";
import { Input } from "antd";

const { Search } = Input;

const DialogsSearchGuys = props => {
  return (
    <div className="dialogs__search-guys">
      <div className="dialogs__search">
        <div className="search__input">
          <Search placeholder="тестовый инпут" onSearch={props.getUsers} />
        </div>
      </div>
      <div className="dialogs__items-wrapper">
        <DialogItem
          avatar="https://sun1.beltelecom-by-minsk.userapi.com/c845323/v845323310/181d46/JP_q_sNhiH0.jpg?ava=1"
          username="Alexander Kit"
          date={new Date()}
          lastMessage="иди поспи лучше чувак серьезно"
          unreadedCount={12}
          isOnline={true}
        />
      </div>
    </div>
  );
};

export default DialogsSearchGuys;
