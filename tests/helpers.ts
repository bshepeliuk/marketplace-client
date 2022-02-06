import { AnyAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@src/app/store';

export const API_URL = 'http://localhost:3000/api';

interface IThunkProps {
  dispatch: AppDispatch;
  getState: () => RootState;
}

type ThunkAction = (
  // eslint-disable-next-line no-unused-vars
  dispatch: AppDispatch,
  // eslint-disable-next-line no-unused-vars
  getState: () => RootState,
) => RootState;

export const thunk =
  ({ dispatch, getState }: IThunkProps) =>
  (next: any) =>
  (action: ThunkAction) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };

export const getActionTypesAndPayload = (actions: AnyAction[]) => {
  return actions.map(({ meta, error, ...actionProps }) => ({ ...actionProps }));
};

export const setupUseFormikMock = ({ mock = null, options = {} }: any) => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleBlur = jest.fn();

  mock.mockReturnValue({
    handleChange,
    handleSubmit,
    handleBlur,
    values: options.values ?? {},
    touched: options.touched ?? {},
    errors: options.errors ?? {},
  } as any);

  return {
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export function generateDevicesByCount(count: number) {
  const result = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= count; i++) {
    result.push({
      id: i,
      name: 'Test Device',
      brandId: 1,
      typeId: 1,
      price: 1000,
      images: [{ url: 'https://image.jpg' }],
    });
  }

  return result;
}
