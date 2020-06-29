import React, { useState } from "react";
import { Input } from "antd";
import DialogsRoutes from "./DialogsRoutes.jsx";
import debounce from "lodash/debounce";

const { Search } = Input;

const DialogsSearchGuys = props => {
  const [page, setPage] = useState(0);
  const wrapperRef = React.useRef(null);
  const [isSearch, setSearch] = useState(false);
  const [users, setUsers] = useState({});
  const onScroll = () => {
    return debounce(e => {
      console.log("scroll");
      setPage(page + 1);
      props.getUsers(page + 1).then(data => {
        console.log(users, data.data);
        setUsers(users.concat(data.data));
      });
    }, 200);
  };

  return (
    <div className="dialogs__search-guys">
      <div className="dialogs__search">
        <div className="search__input">
          <Search
            placeholder="тестовый инпут"
            onSearch={() => {
              props.getUsers(page).then(data => {
                setUsers(data.data);
                setSearch(!isSearch);
              });
            }}
          />
        </div>
      </div>
      <DialogsRoutes
        onScroll={onScroll()}
        wrapperRef={wrapperRef}
        data={users}
        isSearch={isSearch}
      />
    </div>
  );
};

export default DialogsSearchGuys;
