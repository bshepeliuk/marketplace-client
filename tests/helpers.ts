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
