import { useUnit } from "effector-react";
import { $AppStore } from "@stores/App.model";
import { DialogsList } from "./DialogsList/DialogsList";
import "./Home.scss";
import { Dialog } from "./Dialog/Dialog";
import { Profile } from "../Profile/Profile";

export const Home = () => {
  const { isMobileVersion } = useUnit({ isMobileVersion: $AppStore.map((s) => s.isMobileVersion) });

  return (
    <div className="home">
      <DialogsList />
      <Dialog />
      {!isMobileVersion && <Profile />}
    </div>
  );
};
