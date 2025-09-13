import { useUnit } from "effector-react";
import React, { useEffect } from "react";
import { $AppStore } from "../../App.model";
import { Dialog } from "./Dialog/Dialog";
import { DialogsList } from "./DialogsLIst/DialogsList";

import "./Home.scss";
import { Profile } from "./Profile/Profile";
import { UserPage } from "./UserPage/UserPage";
import { Route, Routes } from "react-router";

export const Home = () => {
  const appStore = useUnit($AppStore);

  return (
    <section className="home">
      <DialogsList />
      <Routes>
        <Route path="/dialogs/*" element={<Dialog />} />
        <Route path="/profile/*" element={<UserPage />} />
      </Routes>

      {appStore.isMobileVersion ? null : <Profile />} 
      {/* если это мобильная версия, то не занимаем место профилем */}
    </section>
  );
};
