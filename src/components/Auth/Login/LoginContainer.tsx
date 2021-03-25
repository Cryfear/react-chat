import { FormikErrors, withFormik } from "formik";
import { passwordValidate } from "../../../utils/validations";
import { Login } from "./Login";
import { LoginFx } from "./Login.model";

export type FormDataTypes = {
  email: string;
  password: string;
};

export interface LoginTypes {
  errors: FormDataTypes;
  values: FormDataTypes;
  touched: FormDataTypes;

  handleChange: Function;
}

export const LoginContainer = withFormik<LoginTypes, FormDataTypes>({
  mapPropsToValues: (props) => {
    return {
      email: "",
      password: "",
    };
  },

  validate: (values: FormDataTypes) => {
    let errors: FormikErrors<FormDataTypes> = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (passwordValidate(values.password)) {
      errors.password = "Must be 6-25 latin letters and as min 1 number";
    }

    return errors;
  },

  handleSubmit: async (values) => {
    return await LoginFx({ email: values.email, password: values.password });
  },
})(Login);
