import axios from 'axios';
import { BASE_API_URL } from '../constants';

const getApiInstance = () => {
  return axios.create({
    baseURL: BASE_API_URL,
    withCredentials: true,
  });
};

export default getApiInstance;
