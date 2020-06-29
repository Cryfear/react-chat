import React from "react";
import DialogItemClassic from "../../DialogItem/DialogItemClassic";
import DialogItem from "../../DialogItem/DialogItem";

const DialogsRoutes = props => {
  return !props.isSearch ? (
    <div onScroll={props.onScroll} className="dialogs__items-wrapper" ref={props.wrapperRef}>
      <DialogItem
        avatar="https://sun1.beltelecom-by-minsk.userapi.com/c845323/v845323310/181d46/JP_q_sNhiH0.jpg?ava=1"
        username="Alexander Kit"
        isOnline={true}
        date={new Date()}
        lastMessage={"hiii"}
        unreadedCount={2}
      />
    </div>
  ) : (
    <div onScroll={props.onScroll} className="dialogs__items-wrapper" ref={props.wrapperRef}>
      {props.data.map((item, index) => {
        return (
          <DialogItemClassic
            key={index}
            avatar={item.avatar}
            username={item.fullName}
            isOnline={item.isOnline}
          />
        );
      })}
    </div>
  );
};

export default DialogsRoutes;
