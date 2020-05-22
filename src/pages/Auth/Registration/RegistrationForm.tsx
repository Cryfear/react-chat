import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const RegistrationForm = () => {
  return (
    <Form name="normal_login">
      <Form.Item name="username" className="form__username">
        <Input prefix={<MailOutlined />} placeholder="E-mail" />
      </Form.Item>
      <Form.Item name="password" className="form__username">
        <Input prefix={<UserOutlined />} placeholder="Ваше имя" />
      </Form.Item>
      <Form.Item name="password" className="form__username">
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
    </Form>
  );
};

export default RegistrationForm;
