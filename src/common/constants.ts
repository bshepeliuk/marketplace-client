export const isDev = process.env.NODE_ENV === 'development';

export const BASE_API_URL = isDev ? 'http://localhost:3000/api' : 'https://marketplace-api.fly.dev/api';

export const ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
} as const;

export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
