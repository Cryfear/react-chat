import React from "react";
import "antd/dist/antd.css";
import Auth from "./pages/Auth/Auth";
import "./styles/global.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Message from "./components/Message/Messsage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          exact
          path={["/", "/login", "/registration"]}
          render={() => {
            return <Auth />;
          }}
        />
        <Route
          path="/im"
          render={() => (
            <div>
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
          )}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
