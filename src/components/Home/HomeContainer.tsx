import React, { useEffect } from "react";
import * as lodash from "lodash";
import { setIsLoginUserAction } from "../../redux/login-reducer";
import {
  setActiveDialogAction,
  setSearchPageAction,
  setIsSearchAction,
  getUsersAction,
} from "../../redux/home-reducer";
import { connect } from "react-redux";
import Home from "./Home";
import { Redirect } from "react-router";

interface HomeContainerTypes {
  setIsLoginUserAction: Function;
  isAuth: Boolean;
  getUsersAction: Function;
  page: Number;
  users: Array<Object>;
  activeDialog: String;
  setActiveDialogAction: Function;
  setSearchPageAction: Function;
  setIsSearchAction: Function;
  isSearch: Boolean;
}

const HomeContainer = (props: HomeContainerTypes) => {
  useEffect(() => {
    props.setIsLoginUserAction(sessionStorage["userEmail"]);
  }, [props, props.isAuth]);

  const wrapperRef: any = React.useRef(null); // ссылка на обертку блока где лежат юзеры

  const onScroll = () => {
    return lodash.debounce(() => {
      const isEnd =
        wrapperRef?.current?.scrollHeight - wrapperRef?.current.scrollTop - 550 <=
        wrapperRef?.current.clientHeight;
      if (isEnd) {
        props.getUsersAction(props.page);
      }
    }, 200);
  };

  return props.isAuth ? (
    <Home
      dialogId={props.activeDialog}
      users={props.users}
      setPage={props.setActiveDialogAction}
      setSearch={props.setIsSearchAction}
      page={props.page}
      setDialog={props.setActiveDialogAction}
      onScroll={onScroll}
      isSearch={props.isSearch}
      wrapperRef={wrapperRef}
      getUsers={props.getUsersAction}
    />
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = (state: Storage) => ({
  isAuth: state.login.isAuth,
  activeDialog: state.home.activeDialog,
  page: state.home.searchPage,
  isSearch: state.home.isSearch,
  users: state.home.users,
});

export default connect(mapStateToProps, {
  setIsLoginUserAction,
  setActiveDialogAction,
  setSearchPageAction,
  setIsSearchAction,
  getUsersAction,
})(HomeContainer);
