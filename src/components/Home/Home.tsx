import React from "react";
import "./Home.scss";
import DialogsEdit from "./DialogsEdit/DialogsEdit";
import DialogsSearchGuys from "./DialogsSearchGuys/DialogsSearchGuys";
import { HomeTypes } from "./HomeTypes";
import Messages from "./Messages/Messages";

const Home = (props: HomeTypes) => {
  return (
    <div className="home">
      <div className="dialogs">
        <DialogsEdit // переключатель диалогов и поиска пользователей
          getUsers={props.getUsers}
          setSearch={props.setSearch}
          page={props.page}
          isSearch={props.isSearch}
        />
        <DialogsSearchGuys // диалоги и поиск пользователей
          getUsers={props.getUsers}
          page={props.page}
          users={props.users}
          isSearch={props.isSearch}
        />
      </div>
      <div className="messages">
        <Messages /> {/* блок сообщений */}
      </div>
    </div>
  );
};

export default Home;
