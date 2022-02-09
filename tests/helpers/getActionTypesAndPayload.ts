import { AnyAction } from '@reduxjs/toolkit';

const getActionTypesAndPayload = (actions: AnyAction[]) => {
  return actions.map(({ meta, error, ...actionProps }) => ({ ...actionProps }));
};

export default getActionTypesAndPayload;
