import { ROLE } from './api';

export interface IUser {
  fullName: string;
  email: string;
  role: ROLE.BUYER | ROLE.SELLER;
}

export interface IUserData {
  user: IUser;
}
