import React from "react";
import "./Home.scss";
import DialogsEdit from "../../components/Home/DialogsEdit/DialogsEdit";
import DialogsSearchGuys from "../../components/Home/DialogsSearchGuys/DialogsSearchGuys";
import Header from "../../components/Home/Header/Header";
import MessagesWrapper from "../../components/Home/Messages/MessagesWrapper";
import MessagesInputWrapper from "../../components/Home/Messages/MessagesInputWrapper";
import { UsersApi } from "../../api/api.js";

class Home extends React.Component {
  getUsers = (page: Number) => {
    return UsersApi.getUsers(page).then(data => {
      console.log(data);
      return data;
    });
  };
  render() {
    return (
      <div className="home">
        <div className="dialogs">
          <DialogsEdit />
          <DialogsSearchGuys
            getUsers={() => {
              this.getUsers(0).then(data => {
                console.log(data);
              });
            }}
          />
        </div>
        <div className="messages">
          <Header />
          <MessagesWrapper />
          <MessagesInputWrapper />
        </div>
      </div>
    );
  }
}

export default Home;
