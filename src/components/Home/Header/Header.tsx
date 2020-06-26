import React from "react";

const Header = () => {
  return (
    <div className="messages__header">
      <div className="messages__header-wrapper">
        <div className="messages__header-name">Гай Юлий Цезарь</div>
        <div className="messages__header-online">онлайн</div>
      </div>
      <div className="messages__header-settings"></div>
    </div>
  );
};

export default Header;
