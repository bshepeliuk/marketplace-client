import { searchOrderValidation } from '@src/features/orders/helpers/searchFilterOrderValidation';

describe('[HELPERS]: groupOrderById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have method to validate order id.', () => {
    const validateMethod = searchOrderValidation.id;

    const isValidNumber = validateMethod(1);
    expect(isValidNumber).toBeTruthy();

    const isValidStringNumber = validateMethod('1');
    expect(isValidStringNumber).toBeTruthy();

    const isValidString = validateMethod('Hello World');
    expect(isValidString).toBeFalsy();
  });
});
