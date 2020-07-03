import React, { useState } from "react";
import { Input } from "antd";
import DialogsRoutes from "./DialogsRoutes.jsx";

const { Search } = Input;

const DialogsSearchGuys = props => {
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
        data={props.users}
        isSearch={props.isSearch}
      />
    </div>
  );
};

export default DialogsSearchGuys;
