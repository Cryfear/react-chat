import React, { useEffect, useCallback } from "react";
import { useUnit } from "effector-react";
import { Header } from "./Header/Header";
import { SearchDialogs } from "./SearchDialogs/SearchDialogs";
import "./DialogsList.scss";
import classNames from "classnames";
import {
  $DialogsListStore,
  DialogsLoaderFx,
} from "./DialogsList.model";
import { UserDialogsContainer } from "./UserDialogs/UserDialogsContainer";
import { $AppStore, isMobileVersionChanger } from "../../../App.model";
import { ShowHideButton } from "./Show-hide-button/Show-hide-button";
import { $Show_Hide_ButtonStore } from "./Show-hide-button/Show-hide-button.model";
import { useDebounceDialogsScroll } from "../../../hooks/useDebounceScroll";

export const DialogsList = () => {
  const { store, appStore, ShowHideButtonStore } = useUnit({
    store: $DialogsListStore,
    appStore: $AppStore,
    ShowHideButtonStore: $Show_Hide_ButtonStore,
  });

  const { debouncedScroll, clearDebounce } = useDebounceDialogsScroll();

  const exp = window.matchMedia("(max-width: 1070px)");

  useEffect(() => {
    if (
      sessionStorage["id"] !== "null" &&
      sessionStorage["id"] !== "undefined"
    ) {
      DialogsLoaderFx({ id: sessionStorage["id"], page: 0 });

      if (exp.matches && !appStore.isMobileVersion)
        isMobileVersionChanger(true);

      exp.addEventListener("change", () => {
        exp.matches
          ? isMobileVersionChanger(true)
          : isMobileVersionChanger(false);
      });
    }

    return () => {
      clearDebounce();
    };
  }, [exp, exp.matches, appStore.isMobileVersion, clearDebounce]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    debouncedScroll(e);
  }, [debouncedScroll]);

  const DialogsListClass = classNames(
    appStore.isMobileVersion && !ShowHideButtonStore.isOpenDialogs
      ? "dialogs-list hidden"
      : "dialogs-list"
  );

  return (
    <div className="dialogs-list__wrapper">
      {appStore.isMobileVersion ? <ShowHideButton /> : null}
      <div className={DialogsListClass} onScroll={handleScroll}>
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