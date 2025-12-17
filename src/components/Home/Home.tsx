import { useUnit } from "effector-react";
import { $AppStore } from "@stores/App.model";
import { DialogsList } from "./DialogsList/DialogsList";
import "./Home.scss";
import { Route, Routes } from "react-router";
import { HelloDialog } from "./Dialog/HelloDialog";
import {  $HomeStore } from "@stores/Home.model";
import { Dialog } from "./Dialog/Dialog";
import { Profile } from "../Profile/Profile";
import { UserPage } from "../UserPage/UserPage";

export const Home = () => {
  const { homeStore, AppStore } = useUnit({
    homeStore: $HomeStore,
    AppStore: $AppStore,
  });

  return (
    <section className="home">
      <DialogsList />

      {!homeStore.currentUser && <HelloDialog />}

      <Routes>
        <Route path="/dialogs/:dialogId" element={<Dialog />} />
        <Route path="/profile/:profileId" element={<UserPage />} />
      </Routes>

      {!AppStore.isMobileVersion && <Profile />}
    </section>
  );
};
