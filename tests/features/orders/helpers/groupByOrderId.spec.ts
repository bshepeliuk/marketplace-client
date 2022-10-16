import groupByOrderId from '@src/features/orders/helpers/groupByOrderId';
import { ordersMock } from '../../../mocks/data';

describe('[HELPERS]: groupOrderById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should group orders by id.', () => {
    const result = groupByOrderId(ordersMock);

    for (const [orderInfo, orderItems] of result) {
      expect(Object.keys(orderInfo)).toEqual(expect.arrayContaining(['id', 'fullName', 'phone', 'address']));

      for (const item of orderItems) {
        expect(Object.keys(item)).toEqual(expect.arrayContaining(['id', 'name', 'price', 'quantity', 'orderDevice']));
      }
    }
  });
});
