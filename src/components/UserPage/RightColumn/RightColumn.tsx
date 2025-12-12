import styles from "../UserPage.module.css";
import img from "@assets/bubble-chat.png";
import { useUnit } from "effector-react";
import { Posts } from "../Posts/Posts";
import { CreatePost } from "./CreatePost/CreatePost";
import { $UserPageStore } from "@/store/UserPage.model";

export const RightColumn = () => {
  const userPageStore = useUnit($UserPageStore);

  return (
    <div className={styles.right_column}>
      <div className={styles.title_wrapper}>
        <strong>{userPageStore && userPageStore.user && userPageStore.user.fullName}</strong>
        <img alt="chaticon" src={img} className={styles.send_message} />
        <div className={styles.user_status}>I'm really good today</div>
      </div>

      <hr className={styles.hr} />

      <CreatePost />

      <Posts />
    </div>
  );
};
