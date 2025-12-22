import { useUnit } from "effector-react";
import { $AppStore } from "@stores/App.model";
import { DialogsList } from "./DialogsList/DialogsList";
import "./Home.scss";
import { Route, Routes } from "react-router";
import { Dialog } from "./Dialog/Dialog";
import { Profile } from "../Profile/Profile";

export const Home = () => {
  const { AppStore } = useUnit({
    AppStore: $AppStore,
  });

  return (
    <section className="home">
      <DialogsList />
      <Routes>
        <Route path="/dialogs/:dialogId" element={<Dialog />} />
      </Routes>
      {!AppStore.isMobileVersion && <Profile />}
    </section>
  );
};
