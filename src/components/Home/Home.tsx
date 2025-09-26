import { useUnit } from "effector-react";
import React from "react";
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
import { $HomeStore } from "./Home.model";

export const Home = () => {
  const {appStore, dialogsStore} = useUnit({ appStore: $AppStore, dialogsStore: $DialogsListStore });
  const userPageStore = useUnit($UserPageStore);
  const homeStore = useUnit($HomeStore);

  return (
    <section className="home">
      <DialogsList />
      {!dialogsStore.potentialDialog && !userPageStore.user && !dialogsStore.potentialDialog && !homeStore.currentDialog ? <HelloDialog /> : null}
      <Routes>
        <Route path="/dialogs/*" element={<Dialog />} />
        <Route path="/profile/*" element={<UserPage />} />
      </Routes>

      {appStore.isMobileVersion ? null : <Profile />}
    </section>
  );
};
