import { useStore } from "effector-react";
import React from "react";
import { $AppStore } from "../../App.model";
import { Dialog } from "./Dialog/Dialog";
import { DialogsList } from "./DialogsLIst/DialogsList";

import "./Home.scss";
import { Profile } from "./Profile/Profile";
import { Theme } from "@radix-ui/themes";

export const Home = () => {
  const appStore = useStore($AppStore);

  return (
      <section className="home">
      <DialogsList />
      <Dialog />
      {!appStore.isMobileVersion ? <Profile /> : null}
    </section>
  );
};
