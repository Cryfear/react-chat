import React from "react";
import DialogItemClassic from "../../DialogItem/DialogItemClassic";
import DialogItem from "../../DialogItem/DialogItem";
import { NavLink } from "react-router-dom";
import { DialogsApi } from "../../../api/api";

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
      {props.data
        .filter((item, index) => {
          if (props.value === "") return true;
          if (item.fullName.indexOf(props.value) > -1) return true;
          return false;
        })
        .map((item, index) => {
          return (
            <NavLink
              onClick={() => {
                DialogsApi.createDialog(sessionStorage["userId"], item.id).then(data => {
                  console.log(data);
                });
              }}
              key={index}
              style={{ color: "rgba(0, 0, 0, 0.65)" }}
              to={`/im/${item.id}`}
            >
              <DialogItemClassic
                avatar={item.avatar}
                username={item.fullName}
                isOnline={item.isOnline}
              />
            </NavLink>
          );
        })}
    </div>
  );
};

export default DialogsRoutes;
