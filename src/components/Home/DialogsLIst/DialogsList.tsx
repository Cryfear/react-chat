import React, {useEffect} from "react";

import {Header} from "./Header/Header";
import {SearchDialogs} from "./SearchDialogs/SearchDialogs";

import "./DialogsList.scss";
import {
  DialogsListStore,
  DialogsLoaderFx,
  onScrollUsersLoaderFx,
  onScrollDialogsLoaderFx,
} from "./DialogsList.model";
import {useStore} from "effector-react";
import {UserDialogsContainer} from "./UserDialogs/UserDialogsContainer";
import {isAuthData, isMobileVersionChanger} from "../../../App.model";
import {ShowHideButton} from "./Show-hide-button/Show-hide-button";
import classNames from "classnames";
import {Show_Hide_ButtonStore} from "./Show-hide-button/Show-hide-button.model";

export const DialogsList = () => {
  const store = useStore(DialogsListStore);
  const appStore = useStore(isAuthData);
  const ShowHideButtonStore = useStore(Show_Hide_ButtonStore);

  const exp = window.matchMedia("(max-width: 1070px)");

  useEffect(() => {
    if (sessionStorage["id"] !== 'null' && sessionStorage["id"] !== 'undefined') {
      DialogsLoaderFx({id: sessionStorage["id"], page: 0}).then(data => data);

      if (exp.matches) isMobileVersionChanger(true).then(data => data);

      exp.addEventListener("change", () => {
        exp.matches
          ? isMobileVersionChanger(true)
          : isMobileVersionChanger(false);
      });
    }

  }, [exp, exp.matches, appStore.isMobileVersion]);

  const onScrollLoaderFunction = (e: React.UIEvent<HTMLDivElement>) => {
    return store.isUserSearch
      ? onScrollUsersLoaderFx({e, page: store.usersSearchPage})
      : onScrollDialogsLoaderFx({
        e,
        id: sessionStorage["id"],
        page: store.dialogsSearchPage,
      });
  };

  const DialogsListClass = classNames(
    appStore.isMobileVersion && !ShowHideButtonStore.isOpenDialogs ? "dialogs-list hidden" : "dialogs-list"
  );

  return (
    <div>
      {appStore.isMobileVersion ? <ShowHideButton/> : null}
      <div className={DialogsListClass} onScroll={onScrollLoaderFunction}>
        <Header/>
        <SearchDialogs/>
        <UserDialogsContainer
          Users={store.users}
          Dialogs={store.dialogs}
          isUserSearch={store.isUserSearch}
        />
      </div>
    </div>
  );
};
