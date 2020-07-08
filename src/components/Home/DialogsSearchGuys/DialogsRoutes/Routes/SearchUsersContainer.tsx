import React, { useState } from "react";
import DialogItemClassic from "../DialogItem/DialogItemClassic";
import { NavLink } from "react-router-dom";
import { SearchitemTypes, SearchTypes } from "../../../HomeTypes";
import SearchInput from "./SearchInput/SearchInput";
import debounce from "lodash/debounce";
import SearchUsers from "./SearchUsers";
import { SearchFunction } from "../../../../../assets/Functions";
import { connect } from "react-redux";
import { setActiveDialogAction, createDialogAction } from "../../../../../redux/home-reducer";

const SearchUsersContainer = (props: SearchTypes) => {
  const [searchValue, setValue] = useState(""); // поисковая строка

  const wrapperRef: any = React.useRef(null); // ссылка на обертку блока где лежат юзеры

  const onScroll = debounce(() => {
    const { scrollHeight, scrollTop, clientHeight } = wrapperRef.current;
    const isEnd = scrollHeight - scrollTop - 550 <= clientHeight;
    if (isEnd) {
      props.getUsers(props.page);
    }
  }, 200);

  const MapSearching = (item: SearchitemTypes, index: number) => {
    return (
      <NavLink
        onClick={() => {
          props.createDialogAction(item.id, props.myId);
        }}
        key={index}
        style={{ color: "rgba(0, 0, 0, 0.65)" }}
        to={`/im/${item.id}`}
      >
        <DialogItemClassic avatar={item.avatar} username={item.fullName} isOnline={item.isOnline} />
      </NavLink>
    );
  };

  return (
    <div onScroll={onScroll} className="dialogs__items-wrapper" ref={wrapperRef}>
      <SearchInput setValue={setValue} />
      <SearchUsers
        users={props.users
          // поиск по инпуту
          .filter((item: SearchitemTypes) => SearchFunction(item, searchValue))
          // делаем из массива пользователей элементы диалога
          .map((item: SearchitemTypes, index: number) => MapSearching(item, index))}
      />
    </div>
  );
};

const mapStateToProps = (state: Storage) => ({
  dialogId: state.home.activeDialog,
  myId: state.login.id,
});

export default connect(mapStateToProps, { setActiveDialogAction, createDialogAction })(
  SearchUsersContainer
);
