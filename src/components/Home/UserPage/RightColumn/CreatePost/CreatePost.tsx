import { useUnit } from "effector-react";
import React, { useState } from "react";
import { $UserPageStore, createPostFx } from "../../UserPage.model";
import { $LoginStore } from "../../../../Auth/Login/Login.model";
import styles from '../../UserPage.module.css';

export const CreatePost = () => {
  const userPageStore = useUnit($UserPageStore);
  const loginStore = useUnit($LoginStore);
  const [postInputValue, setPostInputValue] = useState('');

  return (
    <div>
      <input name="create_post" placeholder="Type a post..." className={styles.input_post} type="text" defaultValue={postInputValue} onChange={(e) => setPostInputValue(e.target.value)}></input>
      <button onClick={() => createPostFx({ id: userPageStore.user?._id || 'err', content: postInputValue, creater: loginStore.myUserData.id })} className={styles.create_post} >
        Create post
      </button>
    </div>
  )
}