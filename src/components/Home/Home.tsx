import React, { ReactElement } from "react";
import "./Home.scss";
import DialogsEdit from "./DialogsEdit/DialogsEdit";
import DialogsSearchGuys from "./DialogsSearchGuys/DialogsSearchGuys";
import UsersRoutes from "./UsersRoutes/UsersRoutes";

interface HomeTypes {
  setPage: Function;
  getUsers: Function;
  setSearch: Function;
  page: Number;
  isSearch: Boolean;
  setDialog: Function;
  users: Array<Object>;
  onScroll: Function;
  wrapperRef: ReactElement;
  dialogId: String;
}

const Home = (props: HomeTypes) => {
  return (
    <div className="home">
      <div className="dialogs">
        <DialogsEdit
          getUsers={props.getUsers}
          setSearch={props.setSearch}
          page={props.page}
          isSearch={props.isSearch}
        />
        <DialogsSearchGuys
          setDialog={props.setDialog}
          users={props.users}
          onScroll={props.onScroll}
          isSearch={props.isSearch}
          wrapperRef={props.wrapperRef}
        />
      </div>
      <UsersRoutes dialogId={props.dialogId} users={props.users} />
    </div>
  );
};

export default Home;
