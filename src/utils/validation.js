export const EmailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PhoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

export function isValidEmail(email) {
  return EmailRegExp.test(email);
}

export function isValidPhone(phone) {
  return PhoneRegExp.test(phone);
}

export const isObject = (arg) => {
  return arg && JSON.parse(JSON.stringify(arg)).constructor === Object;
};
