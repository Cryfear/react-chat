import React, { useState } from "react";
import "./Home.scss";
import DialogsEdit from "../../components/Home/DialogsEdit/DialogsEdit";
import DialogsSearchGuys from "../../components/Home/DialogsSearchGuys/DialogsSearchGuys";
import { UsersApi } from "../../api/api.js";
import debounce from "lodash/debounce";
import UsersRouter from "./UsersRoutes";

const Home = props => {
  const getUsers = () => {
    return UsersApi.getUsers(page).then(data => {
      return data;
    });
  };

  const [dialogId, setDialog] = useState(""); // стейт выбранного диалога
  const [page, setPage] = useState(0); // страница поиска, пока не до конца реализовано
  const wrapperRef = React.useRef(null); // ссылка на обертку блока где лежат юзеры
  const [isSearch, setSearch] = useState(false); // стейт на какой мы сейчас вкладке, диалогов или поиска пользователей
  const [users, setUsers] = useState({}); // массив с пользователеями получаемый с сервера

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
          setDialog={setDialog}
          users={users}
          onScroll={onScroll}
          isSearch={isSearch}
          wrapperRef={wrapperRef}
          getUsers={getUsers}
        />
      </div>
      <UsersRouter dialogId={dialogId} users={users} />
    </div>
  );
};

export default Home;
