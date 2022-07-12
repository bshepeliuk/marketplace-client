import { ROLES } from '../constants';

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  role: typeof ROLES.BUYER | typeof ROLES.SELLER;
}

export interface IUserData {
  user: IUser;
}
