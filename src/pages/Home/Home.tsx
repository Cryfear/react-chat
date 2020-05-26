import React from "react";
import Message from "../../components/Message/Messsage";
import "./Home.scss";
import { UserSwitchOutlined, FormOutlined } from "@ant-design/icons";
import { Input } from "antd";
import DialogItem from "../../components/DialogItem/DialogItem";

const { Search } = Input;

interface HomePageProps {}

const Home = (props: HomePageProps) => {
  return (
    <div>
      <div className="dialogs">
        <div className="dialogs__edit">
          <span className="dialogs__edit-user">
            <UserSwitchOutlined style={{ fontSize: "22px" }} />
          </span>
          <span className="dialogs__edit-title">Список диалогов</span>
          <span className="dialogs__edit-button">
            <FormOutlined style={{ fontSize: "22px" }} />
          </span>
        </div>
        <div className="dialogs__search-guys">
          <div className="dialogs__search">
            <div className="search__input">
              <Search placeholder="тестовый инпут" onSearch={value => console.log(value)} />
            </div>
          </div>
          <div className="dialogs__items-wrapper">
            <DialogItem
              avatar="https://sun1.beltelecom-by-minsk.userapi.com/c845323/v845323310/181d46/JP_q_sNhiH0.jpg?ava=1"
              username="Alexander Kit"
              date="Сейчас"
              lastMessage="иди поспи лучше чувак серьезно"
              unreadedCount={5}
            />
          </div>
        </div>
      </div>
      <div className="messages">
        <div className="messages__header">
          <div className="messages__header-wrapper">
            <div className="messages__header-name">Гай Юлий Цезарь</div>
            <div className="messages__header-online">онлайн</div>
          </div>
          <div className="messages__header-settings"></div>
        </div>
        <div className="messages__wrapper">
          <Message
            date={new Date(2020, 4, 24, 15)}
            avatar="https://sun9-47.userapi.com/c857520/v857520118/13765d/yWNm9_uF_XM.jpg"
            message_text="Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻"
          />
          <Message
            date={new Date(2020, 4, 24, 16)}
            avatar="https://sun9-61.userapi.com/c856016/v856016589/150055/pMbRBQCR-o0.jpg"
            message_text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
            isMe={true}
            isReaded={true}
          />
        </div>
        <div className="messages__input-wrapper"></div>
      </div>
    </div>
  );
};

export default Home;
