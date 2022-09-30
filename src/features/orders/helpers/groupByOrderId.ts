import { IOrder, IOrderDevice } from '../types';

const groupByOrderId = (orders: IOrder[]) => {
  const map = new Map();

  for (const item of orders) {
    const { devices, ...order } = item;

    for (const device of devices) {
      const { orderId } = device.orderDevice;

      const prevOrderDevices = map.has(orderId) ? map.get(orderId)[1] : [];

      map.set(orderId, [order, prevOrderDevices.concat([device])]);
    }
  }

  const result: Array<[Omit<IOrder, 'devices'>, IOrderDevice[]]> = Array.from(map.values());

  return result;
};

export default groupByOrderId;
