// выделил отдельный файл для типов, чтобы не засорять код и удобно было к ним вернуться в будущем

export type RegistrationFormValuesTypes = {
  email: string;
  password: string;
  name: string;
  passwordRepeat: string;
}

export type RegistrationTypes = {
  errors: RegistrationFormValuesTypes;
  values: RegistrationFormValuesTypes;
  touched: RegistrationFormValuesTypes;

  handleChange: Function;
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
}

export type LoginStoreTypes  = {
  isAuth: boolean;
  isChecked: boolean;
  isCorrectLogin: null | boolean;
  myUserData: {
    // данные самого залогиненного пользователя
    id: string
    avatar: string,
    name: string,
    isOnline: boolean,
  },
}
