import styles from '../../UserPage.module.css';
import React from 'react';

export const Photo = ({ img }: { img: string }) => {
    return (
        <img src={img} alt="photoAlbom" className={styles.photos_img} />
    )
}