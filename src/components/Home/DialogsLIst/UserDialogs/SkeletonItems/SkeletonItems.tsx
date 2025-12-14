import styles from "./SkeletonItems.module.scss";

export const SkeletonItems = () => {
  const items = Array.from({ length: 8 }).map((_, index) => {
    return (
      <div key={index} className={styles.skeleton_wrapper}>
        <div className={styles.skeleton_item}>
          <div className={styles.skeleton_avatar}></div>
          <div className={styles.skeleton_item_wrapper}>
            <span className={styles.skeleton_item_name}></span>
            <span className={styles.skeleton_item_text}></span>
          </div>
        </div>
      </div>
    );
  });

  return <>{items}</>;
};
