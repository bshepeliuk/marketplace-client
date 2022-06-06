export const isDev = process.env.NODE_ENV === 'development';
export const BASE_API_URL = 'http://localhost:3000/api'; // https://marketplace-check-api.herokuapp.com/

export const ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
} as const;
