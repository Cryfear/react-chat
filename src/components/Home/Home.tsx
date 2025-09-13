import { useUnit } from "effector-react";
import React from "react";
import { $AppStore } from "../../App.model";
import { Dialog } from "./Dialog/Dialog";
import { DialogsList } from "./DialogsLIst/DialogsList";

import "./Home.scss";
import { Profile } from "./Profile/Profile";
import { UserPage } from "./UserPage/UserPage";

export const Home = () => {
  const appStore = useUnit($AppStore);

  return (
    <section className="home">
      <DialogsList />
      {true ? <UserPage /> : <Dialog />} 
      {/* если человек заходит в свой профиль или чужой, то отображаем профиль и убираем окно диалога*/}

      {appStore.isMobileVersion ? null : <Profile />} 
      {/* если это мобильная версия, то не занимаем место профилем */}
    </section>
  );
};
