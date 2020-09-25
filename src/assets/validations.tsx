export const required = (value: string) =>
  value || typeof value === "number" ? undefined : "Это обязательное поле.";

export const requiredPassword = (value: string) => {
  return value || typeof value === "number" ? undefined : "Придумайте пароль!";
};

export const emailisHere = (value: string) => {
  if (value && value.indexOf("duplicate key error collection") > 0) {
    return "Такой email уже зарегистрирован!";
  }
  return "";
};

export const emailValidate = (value: string) => {
  let re = /.+@.+\..+/i;
  return re.test(value) ? undefined : "Невалидный E-mail";
};

export const passwordValidate = (value: string) => {
  let pa = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
  return pa.test(value) ? undefined : "Слишком легкий пароль.";
};

export const repeatePasswordValidate = (values: string) => {
  let password: any = document.getElementById("repeater");
  if (password) {
    return values === password.value ? undefined : "Пароли не совпадают!";
  }
};
