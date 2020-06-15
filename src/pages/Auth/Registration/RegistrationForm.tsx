import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { withFormik } from "formik";
import TypicalButton from "../../../components/Button/TypicalButton";
import { UsersApi } from "../../../api/api";

// interface RegistrationFormTypes {
//   values: {
//     email: string;
//     username: string;
//     password: string;
//     repeatPassword: string;
//   };
//   touched: {
//     email: Boolean;
//     username: Boolean;
//     password: Boolean;
//     repeatPassword: Boolean;
//   };
//   errors: {
//     email: string;
//     username: string;
//     password: string;
//     repeatPassword: string;
//   };
//   handleChange: any;
//   handleBlur: any;
//   handleSubmit: any;
// }

const RegistrationForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
}: any) => {
  return (
    <Form onFinish={handleSubmit} name="normal_login">
      <Form.Item
        hasFeedback
        className="form__username"
        validateStatus={errors.email ? "error" : "success"}
        help={errors.email || touched.email ? errors.email : ""}
      >
        <Input
          name="email"
          id="email"
          prefix={<MailOutlined />}
          placeholder="E-mail"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <span></span>
      </Form.Item>
      <Form.Item
        validateStatus={errors.username ? "error" : "success"}
        help={errors.username || touched.username ? errors.username : ""}
        id="username"
        className="form__username"
      >
        <Input
          name="username"
          prefix={<UserOutlined />}
          placeholder="Ваше имя"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
        />
        <span></span>
      </Form.Item>
      <Form.Item
        validateStatus={errors.password ? "error" : "success"}
        help={errors.password || touched.password ? errors.password : ""}
        className="form__username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          name="password"
          prefix={<LockOutlined />}
          type="password"
          onChange={handleChange}
          placeholder="Придумайте пароль"
          onBlur={handleBlur}
          value={values.password}
        />
        <span></span>
      </Form.Item>
      <Form.Item
        validateStatus={errors.repeatPassword ? "error" : "success"}
        help={errors.repeatPassword || touched.repeatPassword ? errors.repeatPassword : ""}
        className="form__password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password
          name="repeatPassword"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Повторите пароль"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.repeatPassword}
        />
        <span></span>
      </Form.Item>
      <TypicalButton
        onSubmit={handleSubmit}
        classes="auth__button-active"
        children="Зарегистрироваться"
      />
    </Form>
  );
};

export default withFormik({
  validate: values => {
    let re = /.+@.+\..+/i;
    let pa = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
    const errors: any = {};

    if (!values.email) {
      errors.email = "Это обязательное поле";
    } else if (!re.test(values.email)) {
      errors.email = "inccorect email";
    }

    if (!values.username) {
      errors.username = "Это обязательное поле";
    }
    if (!values.password) {
      errors.password = "Придумайте пароль!";
    } else if (!pa.test(values.password)) {
      errors.password = "Пароль слишком легкий";
    }

    if (!values.repeatPassword) {
      errors.repeatPassword = "Придумайте пароль!";
    } else if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Пароли не совпадают!";
    }

    return errors;
  },

  handleSubmit: values => {
    UsersApi.createUser(values);
  },

  displayName: "RegistrationForm",
})(RegistrationForm);
