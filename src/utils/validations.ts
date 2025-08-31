export const required = (value: string | number) =>
  value || typeof value === 'number' ? undefined : "Required Field";

export const passwordValidate = (value: string) => {
  let pa = /^(?=.*[0-9])[a-zA-Z0-9]{6,25}$/;
  return !pa.test(value); // pa.test(value) ? false : true
};