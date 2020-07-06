import React, { useState, ReactElement } from "react";
import { Input } from "antd";
import DialogsRoutes from "./DialogsRoutes/DialogsRoutes";

const { Search } = Input;

interface DialogsSearchGuysTypes {
  setDialog: Function;
  onScroll: Function;
  wrapperRef: ReactElement;
  users: Array<Object>;
  isSearch: Boolean;
}

const DialogsSearchGuys = (props: DialogsSearchGuysTypes) => {
  const [searchValue, setValue] = useState(""); // поисковая строка
  return (
    <div className="dialogs__search-guys">
      <div className="dialogs__search">
        <div className="search__input">
          <Search
            placeholder="Поиск"
            onSearch={value => {
              setValue(value);
            }}
          />
        </div>
      </div>
      <DialogsRoutes
        setDialog={props.setDialog}
        value={searchValue}
        onScroll={props.onScroll()}
        wrapperRef={props.wrapperRef}
        users={props.users}
        isSearch={props.isSearch}
      />
    </div>
  );
};

export default DialogsSearchGuys;
