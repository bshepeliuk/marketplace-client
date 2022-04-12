import {
  IGetDevicesProps,
  ILogin,
  IRegister,
} from '@src/common/types/apiTypes';
import getApiInstance from '@src/common/utils/getApiInstance';
import createSearchParamsStr from '../utils/createSearchParamsStr';

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
  get({ offset, limit, categoryId, filters }: IGetDevicesProps) {
    const paramsUrl = createSearchParamsStr({
      ...filters,
      offset,
      limit,
      categoryId,
    });

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
