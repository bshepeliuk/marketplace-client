import { OrderStatus } from '@src/features/orders/constants';
import ordersReducer, { getOrders, initialState, ordersActions } from '@src/features/orders/ordersSlice';
import { ordersMock } from '../../mocks/data';

describe('[REDUCER]: Orders', () => {
  test('should return initial state', () => {
    const action = {
      type: 'TESTS/SOME_ACTION',
    };

    expect(ordersReducer(initialState, action)).toEqual(initialState);
  });

  test('isLoading should be true when client starts to fetch orders', () => {
    const action = {
      type: getOrders.pending.type,
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      items: [],
      total: null,
    });
  });

  test('should save orders to state.', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: { orders: ordersMock, total: 20 },
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      items: action.payload.orders,
      total: action.payload.total,
    });
  });

  test('isError should be true when something went wrong!', () => {
    const action = {
      type: getOrders.rejected.type,
      payload: { message: 'Something went wrong!' },
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isError: true,
    });
  });

  test('should update order status.', () => {
    const orderDeviceId = ordersMock[0].devices[0].orderDevice.id;
    const newOrderStatus = OrderStatus.shipped;

    const action = {
      type: ordersActions.updateOrderStatus.type,
      payload: { id: orderDeviceId, status: newOrderStatus },
    };

    const updatedOrders = ordersMock.map((order) => {
      const orderDevices = order.devices.map((device) => {
        if (device.orderDevice.id === orderDeviceId) {
          return { ...device, orderDevice: { ...device.orderDevice, status: newOrderStatus } };
        }
        return device;
      });

      return { ...order, devices: orderDevices };
    });

    expect(ordersReducer({ ...initialState, items: ordersMock }, action)).toEqual({
      ...initialState,
      isLoading: false,
      items: updatedOrders,
    });
  });

  test('notFound should be true.', () => {
    const action = {
      type: ordersActions.setNotFound.type,
      payload: { notFound: true },
    };

    expect(ordersReducer(initialState, action)).toEqual({
      ...initialState,
      notFound: true,
    });
  });
});
