import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { $AppStore } from "../../App.model";
import { Dialog } from "./Dialog/Dialog";
import { DialogsList } from "./DialogsLIst/DialogsList";

import "./Home.scss";
import { Profile } from "./Profile/Profile";
import { UserPage } from "./UserPage/UserPage";
import { Route, Routes } from "react-router";
import { HelloDialog } from "./Dialog/HelloDialog";
import { $UserPageStore } from "./UserPage/UserPage.model";
import { $DialogsListStore } from "./DialogsLIst/DialogsList.model";
import { $HomeStore, initialiseDialogFx, loadDialogFx } from "./Home.model";
import { useParams } from "react-router";

export const Home = () => {
  const { appStore, dialogsStore, userPageStore, homeStore } = useUnit(
    { appStore: $AppStore, dialogsStore: $DialogsListStore, userPageStore: $UserPageStore, homeStore: $HomeStore }
  );

  const [isLoading, setIsLoading] = useState(true);
  const id: any = useParams()['*']?.replace('dialogs/', '');

  const [dialogLoader, setDialogLoader] = useState(false);

  useEffect(() => {
    if (!dialogLoader && id) {
      loadDialogFx(id).then(() => setDialogLoader(true));
      initialiseDialogFx({ userId: id, myId: sessionStorage['id'], page: 0 }).finally(() => {
        setIsLoading(false);
      });
    }
    setDialogLoader(true);
  }, [id, dialogLoader])

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="home">
      <DialogsList />
      {!dialogsStore.potentialDialog && !userPageStore.user && !homeStore.currentDialog.id ? <HelloDialog /> : null}
      <Routes>
        <Route path="/dialogs/*" element={<Dialog />} />
        <Route path="/profile/*" element={<UserPage />} />
      </Routes>

      {appStore.isMobileVersion ? null : <Profile />}
    </section>
  );
};
