import { ILogin, IRegister } from '@src/common/types/apiTypes';
import getApiInstance from '@src/common/utils/getApiInstance';

const api = getApiInstance();

export const Auth = {
  login({ email, password }: ILogin) {
    return api.post('/auth/login', { email, password });
  },
  register({ email, password, fullName, role }: IRegister) {
    return api.post('/auth/register', { email, password, fullName, role });
  },
  logout() {
    return api.post('/auth/logout');
  },
};

export const User = {
  get() {
    return api.get('/user');
  },
};

export const Devices = {
  get() {
    return api.get('/devices');
  },
  getOneById(deviceId: number) {
    return api.get(`/devices/${deviceId}`);
  },
};
