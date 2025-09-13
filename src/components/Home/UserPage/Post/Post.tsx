import React, { useState } from "react";
import styles from '../UserPage.module.css';
import likesvg from '../../../../assets/like-svgrepo-com.svg';
import emptylike from '../../../../assets/like-svgrepo-com (1).svg'

export const Post = () => {
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
            <img className={styles.post_avatar} src="https://sun9-15.userapi.com/s/v1/if2/odRKcP1XQScimtFjxjP_SaAt58F9IdFrbwyr6D87_sCMvodzkMrgXL9zy47PYLKxDbUXSvLJkVpIZG_cN3w6D0BK.jpg?quality=96&as=32x26,48x40,72x60,108x89,160x132,240x199,360x298,480x397,540x447,640x529,720x596,1080x894,1280x1059&from=bu&u=XG-yQEhPCtAM2ujCSeGrug75fIe6SNxMt4zxW3psCr0&cs=540x0" alt="avataruser" />
            <div>
                <div className={styles.post_row}>
                    <span className={styles.post_username}>Arthur Kosyakov</span>
                    <span className={styles.post_date}>2 days ago</span>
                </div>
                <div>
                    <div className={styles.post_content}>
                        Hello guys this day i do great job Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, necessitatibus asperiores? Consequatur autem dolorem totam vel, impedit voluptate. Similique recusandae nesciunt expedita a facilis deserunt aliquam illo dolor, eum voluptatum?
                        Teum aliqu eaque, dolorus perspiciatis? Quisquam officiis commodi nihil! Reiciendis, molestiae! Illo, quos sequi!
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
                            <span>2</span>
                        </div>
                        <div className={styles.comments_post}></div>
                        <div className={styles.edit_post}>...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}