export const required = (value: string) =>
  value || typeof value === "number" ? undefined : "Required Field";

export const emailisHere = (value: string) => {
  if (value && value.indexOf("duplicate key error collection") > 0) {
    return "This E-mail is also registrated!";
  }
  return "";
};

export const emailValidate = (value: string) => {
  let re = /.+@.+\..+/i;
  return re.test(value) ? undefined : "Invalid E-mail";
};

export const passwordValidate = (value: string) => {
  let pa = /^(?=.*[0-9])[a-zA-Z0-9]{6,25}$/;
  return pa.test(value) ? false : true;
};