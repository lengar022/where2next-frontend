export interface Session {
    token: string;
  }

  export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    scope: string;
    _id?: string;
  }
  