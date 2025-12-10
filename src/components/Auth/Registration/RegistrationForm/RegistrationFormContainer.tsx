import { FormikErrors, withFormik } from "formik";
import { passwordValidate } from "../../../../utils/validations";
import { RegistrationForm } from "./RegistrationForm";
import { CreateAccountFx } from "../../../../store/Registration.model";
import { RegistrationFormValuesTypes } from "../../../../types/Auth.types";

export const RegistrationFormContainer = withFormik<{}, RegistrationFormValuesTypes>({
  mapPropsToValues: (): RegistrationFormValuesTypes => ({
    email: "",
    password: "",
    name: "",
    passwordRepeat: "",
  }),

  validate: (values: RegistrationFormValuesTypes): FormikErrors<RegistrationFormValuesTypes> => {
    const errors: FormikErrors<RegistrationFormValuesTypes> = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (passwordValidate(values.password)) {
      errors.password = "Must be 6-25 latin letters and at min 1 number";
    }

    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 6) {
      errors.name = "Name must contain minimum 6 symbols";
    }

    if (!values.passwordRepeat) {
      errors.passwordRepeat = "Required";
    } else if (values.passwordRepeat !== values.password) {
      errors.passwordRepeat = "Password aren't the same!";
    }

    return errors;
  },

  handleSubmit: async (values: RegistrationFormValuesTypes) => {
    try {
      await CreateAccountFx({ 
        email: values.email, 
        name: values.name, 
        password: values.password 
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  },

})(RegistrationForm);