export const isDev = process.env.NODE_ENV === 'development';

export const BASE_API_URL = isDev
  ? 'http://localhost:3000/api'
  : 'https://marketplace-api-production.up.railway.app/api';

export const ROLES = {
  BUYER: 'BUYER',
  SELLER: 'SELLER',
} as const;
