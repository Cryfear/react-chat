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
import { $HomeStore } from "./Home.model";
import { $UserPageStore } from "./UserPage/UserPage.model";

export const Home = () => {
  const {appStore, homeStore} = useUnit({ appStore: $AppStore, homeStore: $HomeStore });
  const userPageStore = useUnit($UserPageStore);

  return (
    <section className="home">
      <DialogsList />
      {!homeStore.isInitialisedDialog && !userPageStore.user ? <HelloDialog /> : null}
      <Routes>
        <Route path="/dialogs/*" element={<Dialog />} />
        <Route path="/profile/*" element={<UserPage />} />
      </Routes>

      {appStore.isMobileVersion ? null : <Profile />}
      {/* если это мобильная версия, то не занимаем место профилем */}
    </section>
  );
};
