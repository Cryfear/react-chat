import { FormikErrors } from "formik";

export type RegistrationFormValuesTypes = {
  email: string;
  password: string;
  name: string;
  passwordRepeat: string;
};

export type RegistrationTypes = {
  errors: RegistrationFormValuesTypes;
  values: RegistrationFormValuesTypes;
  touched: RegistrationFormValuesTypes;

  handleChange: Function;
};

export interface RegistrationTypesFormik {
  values: RegistrationFormValuesTypes;

  errors: FormikErrors<RegistrationFormValuesTypes>;

  touched: {
    email?: boolean;
    name?: boolean;
    password?: boolean;
    passwordRepeat?: boolean;
  };

  handleChange: (e: React.ChangeEvent) => void;
  handleSubmit?: (e?: React.FormEvent<HTMLFormElement>) => void;

  isRegistrated?: boolean;
}

export type FormDataTypes = {
  email: string;
  password: string;
};

export type LoginTypes = {
  errors: FormDataTypes;
  values: FormDataTypes;
  touched: FormDataTypes;

  handleChange: Function;
};

export type LoginStoreTypes = {
  isAuth: boolean;
  isChecked: boolean;
  isCorrectLogin: null | boolean;
  myUserData: {
    // данные самого залогиненного пользователя
    id: string;
    avatar: string;
    name: string;
    isOnline: boolean;
  };
};
