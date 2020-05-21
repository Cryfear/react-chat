import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import TypicalButton from "../../../components/Button/TypicalButton";
import {Link} from 'react-router-dom';

const Registration: React.FC = (props) => {
  return (
    <Form name="normal_login">
      <h1 className="auth__mainTitle">Зарегистрироваться</h1>
      <h4 className="auth__loginTitle">
        Для входа в чат, вам нужно зарегестрироваться
      </h4>
      <Form.Item name="username" className="form__username">
        <Input prefix={<MailOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item name="password" className="form__password">
        <Input prefix={<UserOutlined />} placeholder="Ваше имя" />
      </Form.Item>
      <Form.Item name="password" className="form__password">
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Придумайте пароль"
        />
      </Form.Item>
      <Form.Item name="password" className="form__password">
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Повторите пароль"
        />
      </Form.Item>
      <TypicalButton
        classes="auth__button-active"
        children="Зарегистрироваться"
      />
      <h4 className="auth__registrationTitle">
        <Link to="/">Войти в аккаунт</Link>
      </h4>
    </Form>
  );
};

export default Registration;
