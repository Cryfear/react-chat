import React, { useState } from "react";
import styles from '../UserPage.module.css';
import likesvg from '../../../../assets/like-svgrepo-com.svg';
import emptylike from '../../../../assets/like-svgrepo-com (1).svg'

export const Post = (props: { creater: any, owner: any, id: string, date: Date, content: string, likes: any, comments: any }) => {

    const [islike, setIsLike] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const dolike = (likeStatus: any) => {
        setIsLike(likeStatus);
        setIsAnimating(true);

        // Сбрасываем анимацию через время
        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    return (
        <div className={styles.post_wrapper}>
            <img className={styles.post_avatar} src={props.creater.avatar} alt="avataruser" />
            <div>
                <div className={styles.post_row}>
                    <span className={styles.post_username}>{props.creater.fullName}</span>
                    <span className={styles.post_date}>{props.date.toString()}</span>
                </div>
                <div>
                    <div className={styles.post_content}>
                        {props.content}
                    </div>
                    <div className={styles.post_activitites}>
                        <div
                            onClick={() => dolike(!islike)}
                            className={`${styles.likes} ${isAnimating ? styles.likeAnimation : ''}`}
                        >
                            <img
                                src={islike ? likesvg : emptylike}
                                alt="like"
                                className={`${styles.likeIcon} ${isAnimating ? styles.active : ''}`}
                            />
                            <span>{props.likes.count}</span>
                        </div>
                        <div className={styles.comments_post}></div>
                        <div className={styles.edit_post}>...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}