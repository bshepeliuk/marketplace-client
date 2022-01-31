import { ROLE } from './apiTypes';

export interface IUser {
  fullName: string;
  email: string;
  role: ROLE.BUYER | ROLE.SELLER;
}

export interface IUserData {
  user: IUser;
}
