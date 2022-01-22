import axios from 'axios';

const getApiInstance = () => {
  const baseURL = 'http://localhost:3000/api'; // https://marketplace-check-api.herokuapp.com/

  return axios.create({
    baseURL,
    withCredentials: true,
  });
};

export default getApiInstance;
