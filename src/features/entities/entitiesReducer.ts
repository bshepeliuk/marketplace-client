import { AnyAction } from '@reduxjs/toolkit';
import { EntityKeys, IEntitiesState } from './types';

export const initialState: IEntitiesState = {
  devices: {},
  categories: {},
  images: {},
  info: {},
};
// prettier-ignore
// eslint-disable-next-line default-param-last, max-len
function entitiesReducer(state = initialState, action: AnyAction): IEntitiesState {
  const { payload } = action;

  if (payload?.entities) {
    return Object.keys(payload.entities).reduce(
      (prevState, field) => {
        const key = field as EntityKeys;

        return {
          ...prevState,
          [key]: {
            ...prevState[key],
            ...payload.entities[key],
          },
        };
      },
      { ...state }
    );
  }

  return state;
}

export default entitiesReducer;
