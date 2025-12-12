import styles from '../UserPage.module.css';
import { useUnit } from "effector-react";
import { Photos } from "../RightColumn/Photos/Photos";
import { $UserPageStore } from "@stores/UserPage.model";

export const LeftColumn = () => {
  const userPageStore = useUnit($UserPageStore);

  return (
    <div className={styles.left_column}>
      <div><img className={styles.avatar} src={userPageStore?.user?.avatar || 'https://sun9-15.userapi.com/s/v1/if2/odRKcP1XQScimtFjxjP_SaAt58F9IdFrbwyr6D87_sCMvodzkMrgXL9zy47PYLKxDbUXSvLJkVpIZG_cN3w6D0BK.jpg?quality=96&as=32x26,48x40,72x60,108x89,160x132,240x199,360x298,480x397,540x447,640x529,720x596,1080x894,1280x1059&from=bu&u=XG-yQEhPCtAM2ujCSeGrug75fIe6SNxMt4zxW3psCr0&cs=540x0'} alt="avatar" /></div>
      <button className={styles.addFriend_button}>Add friend</button>
      <div className={styles.friends}>Friends: <span className={styles.friend_number}>{userPageStore.friends.length}</span></div>

      <Photos />
    </div>
  )
}