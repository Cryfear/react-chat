import React, { useEffect } from "react";
import { setIsLoginUserAction } from "../../redux/login-reducer";
import {
  setSearchPageAction,
  setIsSearchAction,
  getUsersAction,
  setActiveDialogAction,
} from "../../redux/home-reducer";
import { connect } from "react-redux";
import Home from "./Home";
import { Redirect } from "react-router";
import { HomeContainerTypes } from "./HomeTypes";

const HomeContainer = (props: HomeContainerTypes) => {
  useEffect(() => {
    props.setIsLoginUserAction(sessionStorage["userEmail"]);
  }, [props, props.isAuth]);

  return props.isAuth ? (
    <Home
      users={props.users}
      setPage={props.setActiveDialogAction}
      setSearch={props.setIsSearchAction}
      page={props.page}
      isSearch={props.isSearch}
      getUsers={props.getUsersAction}
    />
  ) : (
    <Redirect to="/" />
  );
};

const mapStateToProps = (state: Storage) => ({
  isAuth: state.login.isAuth,
  page: state.home.searchPage,
  isSearch: state.home.isSearch,
  users: state.home.users,
});

export default connect(mapStateToProps, {
  setIsLoginUserAction,
  setSearchPageAction,
  setIsSearchAction,
  getUsersAction,
  setActiveDialogAction,
})(HomeContainer);
