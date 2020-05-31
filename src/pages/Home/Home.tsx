import React from "react";
import Message from "../../components/Message/Messsage";
import "./Home.scss";
import {
  TeamOutlined,
  FormOutlined,
  SmileOutlined,
  CameraOutlined,
  AudioOutlined,
  SendOutlined,
} from "@ant-design/icons";
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
            <TeamOutlined style={{ fontSize: "22px" }} />
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
              date={new Date()}
              lastMessage="иди поспи лучше чувак серьезно"
              unreadedCount={12}
              isOnline={true}
            />
            <DialogItem
              avatar="https://sun1.beltelecom-by-minsk.userapi.com/c845323/v845323310/181d46/JP_q_sNhiH0.jpg?ava=1"
              username="Alexander Kit"
              date={new Date()}
              lastMessage="иди поспи лучше чувак серьезно"
              unreadedCount={12}
              isOnline={true}
            />
            <DialogItem
              avatar="https://sun1.beltelecom-by-minsk.userapi.com/c845323/v845323310/181d46/JP_q_sNhiH0.jpg?ava=1"
              username="Alexander Kit"
              date={new Date()}
              lastMessage="иди поспи лучше чувак серьезно"
              unreadedCount={12}
              isOnline={true}
            />
            <DialogItem
              avatar="https://sun1.beltelecom-by-minsk.userapi.com/c845323/v845323310/181d46/JP_q_sNhiH0.jpg?ava=1"
              username="Alexander Kit"
              date={new Date()}
              lastMessage="иди поспи лучше чувак серьезно"
              unreadedCount={12}
              isOnline={true}
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
            date={new Date(2020, 4, 27, 16)}
            avatar="https://sun9-47.userapi.com/c857520/v857520118/13765d/yWNm9_uF_XM.jpg"
            message_text="Салам, Брут! Чё, как, уничтожил флот галлов? 🖐🏻"
          />
          <Message
            date={new Date(new Date(2020, 4, 30, 2))}
            avatar="https://sun9-61.userapi.com/c856016/v856016589/150055/pMbRBQCR-o0.jpg"
            message_text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
            isMe={true}
            audio={true}
          />
          <Message
            date={new Date(new Date(2020, 4, 27))}
            avatar="https://sun9-61.userapi.com/c856016/v856016589/150055/pMbRBQCR-o0.jpg"
            message_text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
            isMe={true}
            isReaded={true}
          />
          <Message
            date={new Date(new Date(2020, 4, 30, 2))}
            avatar="https://sun9-61.userapi.com/c856016/v856016589/150055/pMbRBQCR-o0.jpg"
            message_text="Мы тут недавно войска Ариовиста разбили, чуваки хотели закрепиться на галльских землях, лол 🌝"
            isMe={true}
            audio={true}
          />
        </div>
        <div className="messages__input-wrapper">
          <div className="input__stikers">
            <SmileOutlined style={{ fontSize: "17px" }} />
          </div>
          <div className="messages__input-text">
            <input className="message_yeap" type="text" />
          </div>
          <div className="messages__photos">
            <CameraOutlined style={{ fontSize: "17px" }} />
          </div>
          <div className="messages__microphone">
            <AudioOutlined style={{ fontSize: "17px" }} />
          </div>
          <div className="messages__sendMessage">
            <SendOutlined style={{ fontSize: "17px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
