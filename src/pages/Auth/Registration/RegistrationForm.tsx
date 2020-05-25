import React from "react";
import { Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { withFormik } from "formik";

const RegistrationForm = (props: any) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  console.log(touched);
  return (
    <Form onFinish={handleSubmit} name="normal_login">
      <Form.Item
        hasFeedback
        className="form__username"
        validateStatus={errors.email && touched.email ? "error" : "success"}
        help={errors.email && touched.email ? errors.email : ""}
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
        {errors.email && touched.email && <span></span>}
      </Form.Item>
      <Form.Item
        validateStatus={errors.username && touched.username ? "error" : "success"}
        help={errors.username && touched.username ? errors.username : ""}
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
        {errors.username && touched.username && <span></span>}
      </Form.Item>
      <Form.Item
        validateStatus={errors.password && touched.password ? "error" : "success"}
        help={errors.password && touched.password ? errors.password : ""}
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
        {errors.password && touched.password && <span></span>}
      </Form.Item>
      <Form.Item
        validateStatus={errors.repeatPassword && touched.repeatPassword ? "error" : "success"}
        help={errors.repeatPassword && touched.repeatPassword ? errors.repeatPassword : ""}
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
        {errors.repeatPassword && touched.repeatPassword && <span></span>}
      </Form.Item>
    </Form>
  );
};

export default withFormik({
  // Custom sync validation
  validate: values => {
    let re = /.+@.+\..+/i;
    let pa = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
    const errors = {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    };

    if (!values.email) {
      errors.email = "Required";
    } else if (!re.test(values.email)) {
      errors.email = "inccorect email";
    } else {
      errors.email = "";
    }

    if (!values.username) {
      errors.username = "Required";
    }

    if (!pa.test(values.password)) {
      errors.password = "Пароль слишком легкий";
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = "Пароли не совпадают!";
    }
    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "RegistrationForm",
})(RegistrationForm);
