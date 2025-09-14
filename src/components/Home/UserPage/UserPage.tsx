import React, { useEffect } from "react";
import styles from './UserPage.module.css';
import img from '../../../assets/bubble-chat.png';
import { useUnit } from "effector-react";
import { $posts, $UserPageStore, findPostsFx, findProfileFx } from "./UserPage.model";
import { useParams } from "react-router";
import { Photos } from "./Photos/Photos";
import { useCreatingPostsList } from '../../../hooks/useCreatingPostsList';
import { ProfilesApi } from "../../../api/ProfilesApi";

export const UserPage = () => {
    const userPageStore = useUnit($UserPageStore);
    const id = useParams()["*"]?.slice(3);
    const ppp = useUnit($posts); 

    useEffect(() => {
        if (id) findProfileFx(id);
        if(id) findPostsFx(id);
    }, [id]);

    console.log(userPageStore);
    const posts = useCreatingPostsList(ppp);

    return (
        <div className={styles.wrapper}>
            {/* main image header */}
            <img className={styles.main_img} alt="img" src="https://sun9-48.userapi.com/s/v1/if2/TCrFJVD5LxMMfTfgxh_VSMcgDO_gdwGEnGvryKRfK4Hc6oWoo7ik64IkDj9oLsnIFK88gBROfnGqy4_2m4h1Pros.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x426,720x480,1080x719,1280x852,1440x959,2048x1364&from=bu&cs=2048x0" />
            <div className={styles.columns}>
                <div className={styles.left_column}>
                    {/* left column */}
                    <div><img className={styles.avatar} src={userPageStore?.userId?.avatar || 'https://sun9-15.userapi.com/s/v1/if2/odRKcP1XQScimtFjxjP_SaAt58F9IdFrbwyr6D87_sCMvodzkMrgXL9zy47PYLKxDbUXSvLJkVpIZG_cN3w6D0BK.jpg?quality=96&as=32x26,48x40,72x60,108x89,160x132,240x199,360x298,480x397,540x447,640x529,720x596,1080x894,1280x1059&from=bu&u=XG-yQEhPCtAM2ujCSeGrug75fIe6SNxMt4zxW3psCr0&cs=540x0'} alt="avatar" /></div>
                    <button className={styles.addFriend_button}>Add friend</button>
                    <div className={styles.friends}>Friends: <span className={styles.friend_number}>{userPageStore.friends.length}</span></div>
                    <Photos />
                </div>
                {/* right column, main */}
                <div className={styles.right_column}>
                    <div className={styles.title_wrapper}>
                        <strong>{userPageStore?.userId?.fullName}</strong>
                        <img alt='chaticon' src={img} className={styles.send_message} />
                        <div className={styles.user_status}>I'm really good today</div>
                    </div>
                    <hr className={styles.hr} />
                    <button onClick={() => ProfilesApi.createPost({ id: userPageStore.userId._id, content: 'hello world', date: new Date(), likes: { count: 0, likedUsers: [] }, creater: sessionStorage['id'] })} className={styles.create_post}>Create post</button>
                    <div className={styles.posts}>
                        <div>{posts}</div>
                    </div>
                </div>
            </div>
        </div >
    )
}