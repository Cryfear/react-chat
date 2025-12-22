import React, { useEffect, useCallback } from "react";
import { useUnit, useGate } from "effector-react";
import classNames from "classnames";
import { $AppStore } from "@stores/App.model";
import { useDebounceDialogsScroll } from "@hooks/useDebounceScroll";
import { $Show_Hide_ButtonStore } from "./Show-hide-button/Show-hide-button.model";
import { ShowHideButton } from "./Show-hide-button/Show-hide-button";
import { UsersAndDialogs } from "./UserDialogs/UsersAndDialogs";
import { DialogsListGate } from "@/gates/DialogListGate";
import "./DialogsList.scss";
import { DialogsListHeader } from "./UserDialogs/DialogsListHeader/DialogsListHeader";
import { useMobileSync } from "@/hooks/useMobileSync";
import { SearchUsers } from "./UserDialogs/SearchUsers/SearchUsers";

export const DialogsList = () => {
  const { appStore, ShowHideButtonStore } = useUnit({
    appStore: $AppStore,
    ShowHideButtonStore: $Show_Hide_ButtonStore,
  });

  const { debouncedScroll, clearDebounce } = useDebounceDialogsScroll();

  useEffect(() => {
    return () => {
      clearDebounce();
    };
  }, [clearDebounce]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      debouncedScroll(e);
    },
    [debouncedScroll]
  );

  const DialogsListClass = classNames(
    appStore.isMobileVersion && !ShowHideButtonStore.isOpenDialogs ? "dialogs-list hidden" : "dialogs-list"
  );

  useMobileSync();
  useGate(DialogsListGate, sessionStorage.getItem("id") ?? "");

  return (
    <div className="dialogs-list__wrapper">
      {appStore.isMobileVersion && <ShowHideButton />}
      <div className={DialogsListClass} onScroll={handleScroll}>
        <DialogsListHeader />
        <SearchUsers />
        <UsersAndDialogs />
      </div>
    </div>
  );
};
