import React from "react";
import { Form } from "antd";
import { Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const AuthForm = () => {
  return (
    <div className="auth__form">
      <Form name="normal_login">
        <Form.Item name="username" className="form__username">
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item name="password" className="form__password">
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AuthForm;
