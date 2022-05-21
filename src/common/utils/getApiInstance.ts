import axios from 'axios';
import { BASE_API_URL } from '../constants';

const getApiInstance = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
    params: {},
  });

  return instance;
};

export default getApiInstance;
