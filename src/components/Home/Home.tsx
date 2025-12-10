import { useUnit } from "effector-react";
import React from "react";
import { $AppStore } from "../../store/App.model";
import { DialogsList } from "./DialogsList/DialogsList";
import "./Home.scss";
import { Profile } from "./Profile/Profile";
import { Route, Routes } from "react-router";
import { HelloDialog } from "./Dialog/HelloDialog";
import { $HomeStore } from "../../store/Home.model";
import { Dialog } from "./Dialog/Dialog";
import { UserPage } from "./UserPage/UserPage";

export const Home = () => {
  const { homeStore, AppStore } = useUnit({
    homeStore: $HomeStore,
    AppStore: $AppStore
  });

  if (AppStore.isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

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
