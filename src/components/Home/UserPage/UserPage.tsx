import React, { useEffect } from "react";
import styles from "./UserPage.module.css";
import { RightColumn } from "./RightColumn/RightColumn";
import { LeftColumn } from "./LeftColumn/LeftColumn";
import { useParams } from "react-router";
import { findPostsFx, findProfileFx } from "./UserPage.model";

export const UserPage = () => {
  const { profileId } = useParams();

  useEffect(() => {
    console.log(profileId)
    if (profileId) findProfileFx(profileId);
    if (profileId) findPostsFx(profileId);
  }, [profileId]);

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.main_img}
        alt="img"
        src="https://sun9-48.userapi.com/s/v1/if2/TCrFJVD5LxMMfTfgxh_VSMcgDO_gdwGEnGvryKRfK4Hc6oWoo7ik64IkDj9oLsnIFK88gBROfnGqy4_2m4h1Pros.jpg?quality=95&as=32x21,48x32,72x48,108x72,160x107,240x160,360x240,480x320,540x360,640x426,720x480,1080x719,1280x852,1440x959,2048x1364&from=bu&cs=2048x0"
      />
      <div className={styles.columns}>
        <LeftColumn />
        <RightColumn />
      </div>
    </div>
  );
};
