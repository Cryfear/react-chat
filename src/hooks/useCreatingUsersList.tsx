import { UsersSearchItem } from "@components/Home/DialogsList/UserDialogs/UsersSearchItem/UsersSearchItem";
import { usersType } from "@/types/Home.types";

export const useCreatingUsersList = (users: usersType[]) => {
  return users && users.length > 0 ? (
    users.map((userData: usersType) => {
      return <UsersSearchItem {...userData} key={userData.id} />;
    })
  ) : null;
};
