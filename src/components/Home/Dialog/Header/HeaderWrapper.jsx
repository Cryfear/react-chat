import "./Header.scss";
import { Header } from "./Header";
import { useStore } from "effector-react";
import { HomeStore } from "../../Home.model";
import { DialogsListStore } from "../../DialogsLIst/DialogsList.model";

export const HeaderWrapper = () => {
  const store = useStore(HomeStore);
  const dialogsListStore = useStore(DialogsListStore);

  const userName =
    store.currentUser !== null || dialogsListStore.potentialDialog !== null
      ? store.currentUser?.name || dialogsListStore.potentialDialog?.name
      : "undefined";
  const isOnline =
    store?.currentUser?.isOnline || dialogsListStore?.potentialDialog?.isOnline
      ? "online"
      : "offline";

  return (
    <Header userName={userName} isOnline={isOnline} />
  );
};
