import React, { useState } from "react";
import "./Home.scss";
import DialogsEdit from "../../components/Home/DialogsEdit/DialogsEdit";
import DialogsSearchGuys from "../../components/Home/DialogsSearchGuys/DialogsSearchGuys";
import Header from "../../components/Home/Header/Header";
import MessagesWrapper from "../../components/Home/Messages/MessagesWrapper";
import MessagesInputWrapper from "../../components/Home/Messages/MessagesInputWrapper";
import { UsersApi } from "../../api/api.js";
import debounce from "lodash/debounce";

const Home = props => {
  const getUsers = () => {
    return UsersApi.getUsers(page).then(data => {
      return data;
    });
  };
  const [page, setPage] = useState(0);
  const wrapperRef = React.useRef(null);
  const [isSearch, setSearch] = useState(false);
  const [users, setUsers] = useState({});
  const onScroll = () => {
    return debounce(e => {
      const isEnd =
        wrapperRef.current.scrollHeight - wrapperRef.current.scrollTop - 550 <=
        wrapperRef.current.clientHeight;
      if (isEnd) {
        getUsers(page + 1).then(data => {
          if (data.data.length > 0) {
            setPage(page + 1);
            setUsers(users.concat(data.data));
          }
        });
      }
    }, 200);
  };

  return (
    <div className="home">
      <div className="dialogs">
        <DialogsEdit
          setPage={setPage}
          getUsers={getUsers}
          setSearch={setSearch}
          setUsers={setUsers}
          page={page}
          isSearch={isSearch}
        />
        <DialogsSearchGuys
          users={users}
          onScroll={onScroll}
          isSearch={isSearch}
          wrapperRef={wrapperRef}
          getUsers={getUsers}
        />
      </div>
      <div className="messages">
        <Header />
        <MessagesWrapper />
        <MessagesInputWrapper />
      </div>
    </div>
  );
};

export default Home;
