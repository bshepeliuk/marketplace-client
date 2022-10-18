import {
  IAddCommentParams,
  ICreateDeviceParams,
  IEvaluateDeviceParams,
  IGetCommentsParams,
  IGetDevicesProps,
  IGetOrdersParams,
  IGetRepliesParams,
  ILogin,
  IRegister,
  IUpdateCommentParams,
} from '@src/common/types/apiTypes';
import getApiInstance from '@src/common/utils/getApiInstance';
import { OrderStatusValues } from '@src/features/orders/types';
import { IPaymentItems } from '@src/features/payment/types';
import { IUser } from '../types/userTypes';
import generateSearchParamsStr from '../utils/generateSearchParamsStr';

export const api = getApiInstance();

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
  get({ offset = 0, limit = 20, filters }: IGetDevicesProps) {
    const paramsUrl = generateSearchParamsStr({ offset, limit, filters });

    return api.get(`/devices?${paramsUrl}`);
  },
  getOneById(deviceId: number) {
    return api.get(`/devices/${deviceId}`);
  },
  create(params: ICreateDeviceParams) {
    const { images, brandId, categoryId, info, features } = params;

    const formData = new FormData();

    formData.append('info', JSON.stringify(info));
    formData.append('features', JSON.stringify(features));
    formData.append('categoryId', categoryId.toString());
    formData.append('brandId', brandId.toString());

    for (const image of images) {
      formData.append('images', image);
    }

    return api.post('/devices', formData);
  },
};

export const Comments = {
  add({ body, deviceId, parentId }: IAddCommentParams) {
    return api.post('/comments', { body, deviceId, parentId });
  },
  getByDeviceId({ deviceId, limit = 20, offset = 0 }: IGetCommentsParams) {
    return api.get(`/comments/${deviceId}?offset=${offset}&limit=${limit}`);
  },
  updateByCommentId({ commentId, body }: IUpdateCommentParams) {
    return api.patch('/comments', { commentId, body });
  },
  deleteById(commentId: number) {
    return api.delete(`/comments/${commentId}`);
  },
  getRepliesByRootCommentId({ commentId, offset, limit }: IGetRepliesParams) {
    return api.get(`/replies/${commentId}?offset=${offset}&limit=${limit}`);
  },
};

export const Filters = {
  getByCategoryId(categoryId: number) {
    return api.get(`/filters/${categoryId}`);
  },
};

export const Categories = {
  create({ name }: { name: string }) {
    return api.post('/types', { name });
  },
  get({ name }: { name?: string }) {
    const params = { name };

    return api.get('/types', { params });
  },
};

export const Brands = {
  create({ name }: { name: string }) {
    return api.post('/brands', { name });
  },
  get({ name }: { name?: string }) {
    const params = { name };

    return api.get('/brands', { params });
  },
};

export const Payment = {
  session(items: IPaymentItems[], customer: IUser) {
    return api.post('/create-checkout-session', { items, customer });
  },
  activateStripeAccount() {
    return api.post('/onboard-user');
  },
};

export const Ratings = {
  evaluate({ rating, deviceId }: IEvaluateDeviceParams) {
    return api.post('/ratings', { rating, deviceId });
  },
};

export const Orders = {
  get({ limit = 20, offset = 0, filters }: IGetOrdersParams) {
    const paramsUrl = generateSearchParamsStr({ filters, limit, offset });

    return api.get(`/orders?${paramsUrl}`);
  },
  changeStatus({ id, status }: { id: number; status: OrderStatusValues }) {
    return api.patch('/order-status', { id, status });
  },
  getYearOptions() {
    return api.get('/orders/year-options');
  },
};

export const Purchases = {
  get({ limit = 20, offset = 0, filters }: IGetOrdersParams) {
    const paramsUrl = generateSearchParamsStr({ filters, limit, offset });

    return api.get(`/purchases?${paramsUrl}`);
  },
  getYearOptions() {
    return api.get('/purchases/year-options');
  },
};

export const Stats = {
  get() {
    return api.get(`/stats`);
  },
};

export const Interceptors = {
  response(logout: () => void) {
    api.interceptors.response.use(
      (res) => res,
      (error) => {
        const { response } = error;

        const UNAUTHORIZED_STATUS_CODE = 401;

        if (response.status === UNAUTHORIZED_STATUS_CODE) logout();

        return Promise.reject(error);
      },
    );
  },
};
