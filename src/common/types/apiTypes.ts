export enum ROLE {
  // eslint-disable-next-line no-unused-vars
  BUYER = 'BUYER',
  // eslint-disable-next-line no-unused-vars
  SELLER = 'SELLER',
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  fullName: string;
  role: ROLE.SELLER | ROLE.BUYER;
}

export interface IGetDevicesParams {
  limit: number;
  offset: number;
  categoryId?: number;
}
