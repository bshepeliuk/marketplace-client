import { BASE_API_URL } from '@src/common/constants';
import { RequestHandler, rest } from 'msw';
import { ordersGetResponse, ordersYearOptionsResponse, purchasesGetResponse, statsGetResponse } from './responses';

const mswHandlers: RequestHandler[] = [
  // orders
  rest.get(`${BASE_API_URL}/orders`, (req, res, ctx) => {
    return res(ctx.json(ordersGetResponse));
  }),
  rest.patch(`${BASE_API_URL}/order-status`, (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.get(`${BASE_API_URL}/orders/year-options`, (req, res, ctx) => {
    return res(ctx.json(ordersYearOptionsResponse));
  }),
  // purchases
  rest.get(`${BASE_API_URL}/purchases`, (req, res, ctx) => {
    return res(ctx.json(purchasesGetResponse));
  }),
  rest.get(`${BASE_API_URL}/purchases/year-options`, (req, res, ctx) => {
    return res(ctx.json(ordersYearOptionsResponse));
  }),
  // devices
  rest.get(`${BASE_API_URL}/devices`, (req, res, ctx) => {
    return res(ctx.json({ devices: [], count: 0 }));
  }),
  // stats
  rest.get(`${BASE_API_URL}/stats`, (req, res, ctx) => {
    return res(ctx.json(statsGetResponse));
  }),
];

export default mswHandlers;
