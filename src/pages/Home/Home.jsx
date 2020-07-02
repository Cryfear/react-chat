import React, { useState } from "react";
import "./Home.scss";
import DialogsEdit from "../../components/Home/DialogsEdit/DialogsEdit";
import DialogsSearchGuys from "../../components/Home/DialogsSearchGuys/DialogsSearchGuys";
import { UsersApi } from "../../api/api.js";
import debounce from "lodash/debounce";
import { Route } from "react-router";
import Messages from "../../components/Home/Messages/Messages";

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
      <Route
        exact
        path={`/im/5ef4260bb253992934c20def`}
        render={() => {
          return <Messages />;
        }}
      />
    </div>
  );
};

export default Home;
