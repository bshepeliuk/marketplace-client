import { toast } from 'react-toastify';
import notifications from '@src/common/utils/notifications';

jest.mock('react-toastify');

describe('[UTILS] notifications', () => {
  test('should call success method from react-toastify', () => {
    const message = 'success message!';

    notifications.success(message);

    expect(toast.success).toHaveBeenCalledWith(message, {
      ...notifications._options,
      autoClose: 2000,
    });
  });

  test('should call info method from react-toastify', () => {
    const message = 'info message!';

    notifications.info(message);

    expect(toast.info).toHaveBeenCalledWith(message, notifications._options);
  });

  test('should call error method from react-toastify', () => {
    const message = 'Something went wrong!';

    notifications.error(message);

    expect(toast.error).toHaveBeenCalledWith(message, {
      ...notifications._options,
      autoClose: 5000,
    });
  });
});
