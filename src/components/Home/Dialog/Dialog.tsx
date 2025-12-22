import { useEffect } from "react";
import { Content } from "./Content/Content";
import "./Dialog.scss";
import { useParams } from "react-router";
import { $HomeStore, loadDialogFx } from "@stores/Home.model";
import { useUnit } from "effector-react";
import dots from "@assets/dots.svg";

export const Dialog = () => {
  const { dialogId } = useParams();
  const store = useUnit($HomeStore);

  const user = store.currentUser || {
    fullName: "Loading...",
    isOnline: false,
  };

  useEffect(() => {
    if (dialogId) loadDialogFx(dialogId);
  }, [dialogId]);

  return (
    <div className="dialog__wrapper">
      <div className="dialog__header">
        <div className="dialog__header-name">
          <h3>{user.fullName}</h3>
          <p className={user.isOnline ? "online" : "offline"}>{user.isOnline ? "online" : "offline"}</p>
        </div>
        <div className="dialog__header-settings">
          <img src={dots} alt="dots" />
        </div>
      </div>
      <Content />
    </div>
  );
};
