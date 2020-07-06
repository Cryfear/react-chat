import React from "react";
import "./Home.scss";
import DialogsEdit from "./DialogsEdit/DialogsEdit";
import DialogsSearchGuys from "./DialogsSearchGuys/DialogsSearchGuys";
import UsersRoutes from "./UsersRoutes/UsersRoutes";

const Home = props => {
  return (
    <div className="home">
      <div className="dialogs">
        <DialogsEdit
          setPage={props.setPage}
          getUsers={props.getUsers}
          setSearch={props.setSearch}
          setUsers={props.setUsers}
          page={props.page}
          isSearch={props.isSearch}
          switchPage={props.switchPage}
        />
        <DialogsSearchGuys
          setDialog={props.setDialog}
          users={props.users}
          onScroll={props.onScroll}
          isSearch={props.isSearch}
          wrapperRef={props.wrapperRef}
          getUsers={props.getUsers}
        />
      </div>
      <UsersRoutes dialogId={props.dialogId} users={props.users} />
    </div>
  );
};

export default Home;
