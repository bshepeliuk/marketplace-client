import { AppDispatch, RootState } from '@src/app/store';

export type Nullable<T> = T | null;

export interface IErrorMessage {
  message: string;
}

export interface IThunkAPI {
  rejectValue: IErrorMessage;
  state: RootState;
  dispatch: AppDispatch;
}
