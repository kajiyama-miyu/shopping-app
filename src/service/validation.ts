export const nameValidation = (name: string): string => {
  if (!name) return "名前を入力てください";

  return "";
};
export const emailValidation = (email: string): string => {
  if (!email) return "メールアドレスを入力してください";

  const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
  if (!regex.test(email)) return "正しい形式でメールアドレスを入力してください";

  return "";
};

export const zipcodeValidation = (zipcode: string): string => {
  if (!zipcode) return "郵便番号を入力してください";

  const regex = /^(\d{0,7}|\d{0,3}|\d{3}-\d{0,4})$/ || /^(\d{7}|\d{3}-\d{4})$/;
  if (!regex.test(zipcode)) return "正しい形式で郵便番号を入力してください";

  return "";
};

export const prefectureValidation = (prefecture: string): string => {
  if (!prefecture) return "住所（都道府県）を入力してください";

  return "";
};

export const cityValidation = (city: string): string => {
  if (!city) return "住所（市区町村）を入力してください";

  return "";
};

export const restAddressValidation = (restAddress: string): string => {
  if (!restAddress) return "住所（その他の住所）を入力してください";

  return "";
};

export const telphoneValidation = (telephone: string): string => {
  if (!telephone) return "電話番号を入力してください";

  const regex = /^0\d{9,10}$/;
  if (!regex.test(telephone))
    return "ハイフンなしで正しく電話番号を入力してください";

  return "";
};

export const passwordValidation = (password: string): string => {
  if (!password) return "パスワードを入力してください";

  if (password.length < 6) return "6文字以上で入力してください";

  return "";
};

export const signInPassValidation = (password: string): string => {
  if (!password) return "パスワードを入力してください";

  return "";
};

export const ConfirmPsswordValidation = (confirmPassword: string): string => {
  if (!confirmPassword) return "確認パスワードを入力してください";

  return "";
};

export const formValidation = (type: string, value: string) => {
  switch (type) {
    case "destination_name":
      return nameValidation(value);
    case "destination_email":
      return emailValidation(value);
    case "destination_zipcode":
      return zipcodeValidation(value);
    case "prefecture":
      return prefectureValidation(value);
    case "city":
      return cityValidation(value);
    case "restAddress":
      return restAddressValidation(value);
    case "destination_tel":
      return telphoneValidation(value);
  }
};

export const SignUpValidation = (type: string, value: string) => {
  switch (type) {
    case "name":
      return nameValidation(value);
    case "email":
      return emailValidation(value);
    case "zipcode":
      return zipcodeValidation(value);
    case "prefecture":
      return prefectureValidation(value);
    case "city":
      return cityValidation(value);
    case "restAddress":
      return restAddressValidation(value);
    case "telephone":
      return telphoneValidation(value);
    case "password":
      return passwordValidation(value);
    case "confirmPassword":
      return ConfirmPsswordValidation(value);
  }
};

export const SignInValidation = (type: string, value: string) => {
  switch (type) {
    case "email":
      return emailValidation(value);
    case "password":
      return signInPassValidation(value);
  }
};
