import React, { useEffect, useCallback } from "react";
import { useUnit, useGate } from "effector-react";
import "./DialogsList.scss";
import classNames from "classnames";
import { $AppStore, isMobileVersionChanger } from "@stores/App.model";
import { useDebounceDialogsScroll } from "@hooks/useDebounceScroll";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { $Show_Hide_ButtonStore } from "./Show-hide-button/Show-hide-button.model";
import { ShowHideButton } from "./Show-hide-button/Show-hide-button";
import { Header } from "./Header/Header";
import { SearchDialogs } from "./SearchDialogs/SearchDialogs";
import { UserDialogsContainer } from "./UserDialogs/UserDialogsContainer";
import { DialogsListGate } from "@/gates/DialogListGate";

export const DialogsList = () => {
  const { appStore, ShowHideButtonStore } = useUnit({
    appStore: $AppStore,
    ShowHideButtonStore: $Show_Hide_ButtonStore,
  });

  const id = sessionStorage.getItem("id") ?? "";

  useGate(DialogsListGate, id);

  const { debouncedScroll, clearDebounce } = useDebounceDialogsScroll();

  useEffect(() => {
    return () => {
      clearDebounce();
    };
  }, [clearDebounce]);

  const isMobile = useMediaQuery("(max-width: 1070px)");

  useEffect(() => {
    if (isMobile !== appStore.isMobileVersion) {
      isMobileVersionChanger(isMobile);
    }
  }, [isMobile, appStore.isMobileVersion]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      debouncedScroll(e);
    },
    [debouncedScroll]
  );

  const DialogsListClass = classNames(
    appStore.isMobileVersion && !ShowHideButtonStore.isOpenDialogs ? "dialogs-list hidden" : "dialogs-list"
  );

  return (
    <div className="dialogs-list__wrapper">
      {appStore.isMobileVersion && <ShowHideButton />}
      <div className={DialogsListClass} onScroll={handleScroll}>
        <Header />
        <SearchDialogs />
        <UserDialogsContainer />
      </div>
    </div>
  );
};
