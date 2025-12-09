import React, { useEffect } from "react";
import dots from "../../../../assets/dots.svg";
import "./Header.scss";
import { findProfileFx } from "../../UserPage/UserPage.model";
import { Link } from "react-router-dom";
import { useUnit } from "effector-react";
import { $HomeStore } from "../../Home.model";

export const Header = () => {
  const store = useUnit($HomeStore);

  // Дефолтный объект
  const user = store.currentUser || {
    fullName: 'Loading...',
    id: '',
    isOnline: false
  };

  const { fullName, id, isOnline } = user;

  useEffect(() => {
    console.log(fullName, id, isOnline)
  }, [fullName, id, isOnline])

  return (
    <div className="dialog__header">
      <div className="dialog__header-name">
        {/* Безопасная ссылка */}
        <Link 
          className="dialog__header__link" 
          to={id ? `/profile/${id}` : '#'}
          onClick={(e) => {
            if (!id) e.preventDefault();
          }}
        >
          <h3 onClick={() => id && findProfileFx(id)}>
            {fullName}
          </h3>
        </Link>
        <p className={isOnline ? 'online' : 'offline'}>
          {isOnline ? 'online' : 'offline'}
        </p>
      </div>
      <div className="dialog__header-settings">
        <img src={dots} alt="dots" />
      </div>
    </div>
  );
};
