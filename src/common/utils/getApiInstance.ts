import axios from 'axios';

// axios.defaults.withCredentials = true;

const getApiInstance = () => {
  const baseURL = 'https://marketplace-check-api.herokuapp.com/api'; // https://marketplace-check-api.herokuapp.com/

  return axios.create({
    baseURL,
    withCredentials: true,
  });
};

export default getApiInstance;
