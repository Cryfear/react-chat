import { FormikErrors, withFormik } from "formik";
import { passwordValidate } from "../../../../utils/validations";
import { RegistrationForm } from "./RegistrationForm";
import { CreateAccountFx } from "../Registration.model";

interface RegistrationFormValuesTypes {
  email: string;
  password: string;
  name: string;
  passwordRepeat: string;
}

export type RegistrationFormDataTypes = {
  email: string;
  password: string;
  name: string;
  passwordRepeat: string;
};

export interface RegistrationTypes {
  errors: RegistrationFormDataTypes;
  values: RegistrationFormDataTypes;
  touched: RegistrationFormDataTypes;

  handleChange: Function;
}

export const RegistrationFormContainer = withFormik<any, RegistrationFormValuesTypes>({
  mapPropsToValues: (props) => {
    return {
      email: "",
      password: "",
      name: "",
      passwordRepeat: "",
    };
  },

  validate: (values: RegistrationFormValuesTypes) => {
    let errors: FormikErrors<RegistrationFormValuesTypes> = {};
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

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 6) {
      errors.name = "Name must contain miminum 6 symbols";
    }

    if (!values.passwordRepeat) {
      errors.passwordRepeat = "Required";
    } else if (values.passwordRepeat !== values.password) {
      errors.passwordRepeat = "Password aren't the same!";
    }

    return errors;
  },

  handleSubmit: async (values) => {
    return await CreateAccountFx({ email: values.email, name: values.name, password: values.password });
  },
})(RegistrationForm);
