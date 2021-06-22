import React from "react";
import {Dialog} from "./Dialog/Dialog";
import {DialogsList} from "./DialogsLIst/DialogsList";

import "./Home.scss";

export const Home = () => {
  return (
    <section className="home">
      <DialogsList/>
      <Dialog/>
    </section>
  );
};
