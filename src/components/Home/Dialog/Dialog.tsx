import { useEffect, useState } from "react";
import { Content } from "./Content/Content";
import "./Dialog.scss";
import { useParams } from "react-router";
import { useUnit } from "effector-react";
import dots from "@assets/dots.svg";
import { HelloDialog } from "./HelloDialog";
import { $currentDialog, $currentUser, loadDialogFx } from "@/store/home";
import { socket } from "@/socket";

export const Dialog = () => {
  const { dialogId } = useParams();
  const { currentUser, currentDialog } = useUnit({
    currentUser: $currentUser,
    currentDialog: $currentDialog,
  });
  const [loading, setLoading] = useState(true);

  const user = currentUser || {
    fullName: "Loading...",
    isOnline: false,
  };

  useEffect(() => {
    if (dialogId) {
      socket.emit("dialog:join", currentDialog.id);
      loadDialogFx(dialogId).then(() => setLoading(false));
    }
  }, [currentDialog.id, dialogId]);

  if (!dialogId) return <HelloDialog />;

  return (
    <div className="dialog__wrapper">
      <div className="dialog__header">
        <div className="dialog__header-name">
          <h3>{user.name}</h3>
          <p className={user.isOnline ? "online" : "offline"}>{user.isOnline ? "online" : "offline"}</p>
        </div>
        <div className="dialog__header-settings">
          <img src={dots} alt="dots" />
        </div>
      </div>
      <Content loading={loading} />
    </div>
  );
};
