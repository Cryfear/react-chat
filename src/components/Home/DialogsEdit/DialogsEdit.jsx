import { TeamOutlined, FormOutlined } from "@ant-design/icons";
import React from "react";

const DialogsEdit = props => {
  return (
    <div className="dialogs__edit">
      <span className="dialogs__edit-user">
        <TeamOutlined style={{ fontSize: "22px" }} />
      </span>
      <span className="dialogs__edit-title">Список диалогов</span>
      <span
        onClick={() => {
          props.getUsers(props.page).then(data => {
            if (props.page === 0) {
              props.setUsers(data.data);
              props.setPage(props.page + 1);
            }
            props.setSearch(!props.isSearch);
          });
        }}
        className="dialogs__edit-button"
      >
        <FormOutlined style={{ fontSize: "22px" }} />
      </span>
    </div>
  );
};

export default DialogsEdit;
