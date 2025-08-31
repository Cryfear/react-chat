import { useStore } from "effector-react";
import React from "react";
import { isAuthData } from "../../App.model";
import { Dialog } from "./Dialog/Dialog";
import { DialogsList } from "./DialogsLIst/DialogsList";

import "./Home.scss";
import { Profile } from "./Profile/Profile";

export const Home = () => {
  const appStore = useStore(isAuthData);

  return (
    <section className="home">
      <DialogsList />
      <Dialog />
      {!appStore.isMobileVersion ? <Profile /> : null}
    </section>
  );
};
