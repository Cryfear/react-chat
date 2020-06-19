export const required = value =>
  value || typeof value === "number" ? undefined : "Это обязательное поле.";

export const requiredPassword = value => {
  return value || typeof value === "number" ? undefined : "Придумайте пароль!";
};

export const emailValidate = value => {
  let re = /.+@.+\..+/i;
  return re.test(value) ? undefined : "Невалидный E-mail";
};

export const passwordValidate = value => {
  let pa = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;
  return pa.test(value) ? undefined : "Слишком легкий пароль.";
};

export const repeatePasswordValidate = values => {
  let password = document.getElementById("repeater");
  if (password) {
    return values === password.value ? undefined : "Пароли не совпадают!";
  }
};
