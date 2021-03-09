export interface User {
  userName: string;
  email: string;
  zipCode: string;
  address: string;
  telephone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUser {
  isSignedIn: boolean;
  loginTokrn: string;
}

export interface Login {
  email: string;
  password: string;
}
