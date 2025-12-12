import styles from '../UserPage.module.css';
import { useUnit } from "effector-react";
import { $posts } from "@stores/UserPage.model";
import { useCreatingPostsList } from "@hooks/useCreatingPostsList";

export const Posts = () => {
  const postsStore = useUnit($posts);
  const postsJsx = useCreatingPostsList(postsStore);

  return (
    <div className={styles.posts}>
      <div>{postsJsx}</div>
    </div>
  )
}