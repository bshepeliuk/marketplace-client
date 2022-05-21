import {
  IGetDevicesProps,
  ILogin,
  IRegister,
} from '@src/common/types/apiTypes';
import getApiInstance from '@src/common/utils/getApiInstance';
import generateSearchParamsStr from '../utils/generateSearchParamsStr';

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
  get({ offset, limit, filters }: IGetDevicesProps) {
    const paramsUrl = generateSearchParamsStr({ offset, limit, filters });

    return api.get(`/devices?${paramsUrl}`);
  },
  getOneById(deviceId: number) {
    return api.get(`/devices/${deviceId}`);
  },
};

export const Filters = {
  getByCategoryId(categoryId: number) {
    return api.get(`/filters/${categoryId}`);
  },
};

export const Categories = {
  get() {
    return api.get('/types');
  },
};

export const Brands = {
  get() {
    return api.get('/brands');
  },
};

export const Interceptors = {
  response(logout: () => void) {
    api.interceptors.response.use(
      (res) => res,
      (error) => {
        const { response } = error;

        if (response.status === 401) logout();

        return Promise.reject(error);
      },
    );
  },
};
