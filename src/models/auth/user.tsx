export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}
