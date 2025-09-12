import { useUnit } from "effector-react";
import React from "react";
import { $AppStore } from "../../App.model";
import { Dialog } from "./Dialog/Dialog";
import { DialogsList } from "./DialogsLIst/DialogsList";

import "./Home.scss";
import { Profile } from "./Profile/Profile";

export const Home = () => {
  const appStore = useUnit($AppStore);

  return (
      <section className="home">
      <DialogsList />
      <Dialog />
      {!appStore.isMobileVersion ? <Profile /> : null}
    </section>
  );
};
