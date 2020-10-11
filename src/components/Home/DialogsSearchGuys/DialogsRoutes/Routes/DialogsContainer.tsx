import React, { useEffect, useState } from "react";
import DialogItem from "../DialogItem/DialogItem";
import { DialogsTypes } from "../../../HomeTypes";
import SearchInput from "./SearchInput/SearchInput";
import {
  getMyDialogs,
  setSearchPageAction,
} from "../../../../../redux/home-reducer";
import { connect } from "react-redux";

const Dialogs = (props: DialogsTypes) => {
  useEffect(() => {
    props.getMyDialogs(props.id);
  }, []);

  const wrapperRef: any = React.useRef(null); // ссылка на обертку блока где лежат юзеры
  const [, setValue] = useState(""); // поисковая строка

  console.log(props.myDialogs);

  let dialogs = props.myDialogs.map((item: any, index: number) => {
    console.log(item);
    return (
      <DialogItem
        avatar={item.partner[0].avatar}
        username={item.partner[0].fullName}
        isOnline={item.partner[0].isOnline}
        date={new Date()}
        lastMessage={item.messages[0][0].data}
        unreadedCount={2}
        key={index}
      />
    );
  });

  return (
    <div className="dialogs__items-wrapper" ref={wrapperRef}>
      <SearchInput setValue={setValue} />
      {dialogs}
    </div>
  );
};

const mapStateToProps = (state: Storage) => ({
  users: state.home.users,
  id: state.login.id,
  myDialogs: state.home.myDialogs,
});

export default connect(mapStateToProps, {
  getMyDialogs,
  setSearchPageAction,
})(Dialogs);
