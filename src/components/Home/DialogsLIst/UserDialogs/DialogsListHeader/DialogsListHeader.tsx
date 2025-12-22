import { Profile } from "@/components/Profile/Profile";
import { $AppStore } from "@/store/App.model";
import { $isUserSearch, changeUserSearch, UsersLoaderFx } from "@/store/UsersList.model";
import pencil from "@assets/pencil.svg";
import people from "@assets/people.svg";
import { useUnit } from "effector-react";

export const DialogsListHeader = () => {
  const { appStore, isUserSearch } = useUnit({
    appStore: $AppStore,
    isUserSearch: $isUserSearch,
  });

  return (
    <div className="list-header">
      <img src={people} alt="icon" className="list-header__icon" />
      <span>Dialogs List</span>
      {appStore.isMobileVersion && <span>|</span>}
      {appStore.isMobileVersion && (
        <span>
          <Profile />
        </span>
      )}
      <button
        onClick={() => {
          UsersLoaderFx(0);
          changeUserSearch(!isUserSearch);
        }}
        className="list-header__button"
      >
        <img src={pencil} alt="button" />
      </button>
    </div>
  );
};
