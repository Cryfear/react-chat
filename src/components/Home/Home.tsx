import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { $AppStore } from "../../App.model";
import { Dialog } from "./Dialog/Dialog";
import { DialogsList } from "./DialogsLIst/DialogsList";

import "./Home.scss";
import { Profile } from "./Profile/Profile";
import { UserPage } from "./UserPage/UserPage";
import { Route, Routes } from "react-router";
import { HelloDialog } from "./Dialog/HelloDialog";
import { $UserPageStore, findPostsFx, findProfileFx } from "./UserPage/UserPage.model";
import { $DialogsListStore } from "./DialogsLIst/DialogsList.model";
import { $HomeStore, initialiseDialogFx, loadDialogFx } from "./Home.model";
import { useParams } from "react-router";

export const Home = () => {
  const { appStore, dialogsStore, userPageStore, homeStore } = useUnit(
    { appStore: $AppStore, dialogsStore: $DialogsListStore, userPageStore: $UserPageStore, homeStore: $HomeStore }
  );

  const [isLoading, setIsLoading] = useState(true);
  let id: any = useParams()['*'];

  // здесь происходит загрузка профиля или диалога, в зависимости от того, где находится пользователь выполняется запрос
  useEffect(() => {
    if (isLoading) {
      if (id.includes('dialogs/')) {
        const idReplaced = id.replace('dialogs/', '')

        loadDialogFx(idReplaced).then(() => {
          initialiseDialogFx({ userId: idReplaced, myId: sessionStorage['id'], page: 0 }).finally(() => {
            setIsLoading(false);
          });
        });
      }
      else if (id.includes('profile/')) {
        const idReplaced = id.replace('profile/:id', '');

        if (idReplaced) findProfileFx(idReplaced);
        if (idReplaced) findPostsFx(idReplaced).then(() => setIsLoading(false));

      }
      else {
        setIsLoading(false);
      }
    }
  }, [id, isLoading, homeStore])

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="home">
      <DialogsList />
      {!dialogsStore.potentialDialog && !userPageStore.user && !homeStore.currentDialog.id ? <HelloDialog /> : null}
      <Routes>
        <Route path="/dialogs/*" element={<Dialog />} />
        <Route path="/profile/*" element={<UserPage />} />
      </Routes>

      {appStore.isMobileVersion ? null : <Profile />}
    </section>
  );
};
