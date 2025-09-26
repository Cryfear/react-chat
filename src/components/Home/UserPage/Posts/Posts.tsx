import React from "react"
import styles from '../UserPage.module.css';
import { useUnit } from "effector-react";
import { useCreatingPostsList } from "../../../../hooks/useCreatingPostsList";
import { $posts } from "../UserPage.model";

export const Posts = () => {
  const postsStore = useUnit($posts);
  const postsJsx = useCreatingPostsList(postsStore);

  console.log(postsStore);

  return (
    <div className={styles.posts}>
      <div>{postsJsx}</div>
    </div>
  )
}