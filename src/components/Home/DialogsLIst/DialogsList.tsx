import React, { useEffect, useState } from "react";

import { Header } from "./Header/Header";
import { SearchDialogs } from "./SearchDialogs/SearchDialogs";

import "./DialogsList.scss";
import {
  $DialogsListStore,
  DialogsLoaderFx,
  onScrollUsersLoaderFx,
  onScrollDialogsLoaderFx,
  readyToCreateDialogFx,
} from "./DialogsList.model";
import { useUnit } from "effector-react";
import { UserDialogsContainer } from "./UserDialogs/UserDialogsContainer";
import { $AppStore, isMobileVersionChanger } from "../../../App.model";
import { ShowHideButton } from "./Show-hide-button/Show-hide-button";
import classNames from "classnames";
import { Show_Hide_ButtonStore } from "./Show-hide-button/Show-hide-button.model";
import { useParams } from "react-router";
import { UsersApi } from "../../../api/UsersApi";
import { createEffect } from "effector";
import { initialiseDialogFx } from "../Home.model";

export const DialogsList = () => {
  const store = useUnit($DialogsListStore);
  const appStore = useUnit($AppStore);
  const ShowHideButtonStore = useUnit(Show_Hide_ButtonStore);

  const [dialogLoader, setDialogLoader] = useState(false);

  const exp = window.matchMedia("(max-width: 1070px)");

  const id: any = useParams()["*"]?.replace('dialogs/', '');

  const loadDialogFx = createEffect(async (id: string): Promise<any> => {
    const user = await UsersApi.findUser(id);
    await readyToCreateDialogFx({ myId: sessionStorage['id'], user: user.data });
    setDialogLoader(true);
  })

  useEffect(() => {
    if (sessionStorage["id"] !== 'null' && sessionStorage["id"] !== 'undefined') {
      DialogsLoaderFx({ id: sessionStorage["id"], page: 0 }).then(data => data);

      if (exp.matches) isMobileVersionChanger(true).then(data => data);

      // ;

      exp.addEventListener("change", () => {
        exp.matches
          ? isMobileVersionChanger(true)
          : isMobileVersionChanger(false);
      });
    }

  }, [exp, exp.matches, appStore.isMobileVersion]);

  useEffect(() => {
    if (!dialogLoader) {
      loadDialogFx(id);
      initialiseDialogFx({ userId: id, myId: sessionStorage['id'], page: 0 })
    }
    setDialogLoader(true);
  }, [dialogLoader])

  const onScrollLoaderFunction = (e: React.UIEvent<HTMLDivElement>) => {
    return store.isUserSearch
      ? onScrollUsersLoaderFx({ e, page: store.usersSearchPage })
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
    <div className="dialogs-list__wrapper">
      {appStore.isMobileVersion ? <ShowHideButton /> : null}
      <div className={DialogsListClass} onScroll={onScrollLoaderFunction}>
        <Header />
        <SearchDialogs />
        <UserDialogsContainer
          Users={store.users}
          Dialogs={store.dialogs}
          isUserSearch={store.isUserSearch}
        />
      </div>
    </div>
  );
};
