/* eslint-disable react/require-default-props */
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import store from '@src/app/store';
import configureMockStore from 'redux-mock-store';

interface Props {
  children?: ReactNode;
  state?: any;
}

const mockStore = configureMockStore();

export function Wrapper({ children, state }: Props) {
  const hasState = state === undefined;

  const rootState = hasState ? store.getState() : state;

  const storeMock = mockStore(rootState);

  return (
    <Provider store={storeMock}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
}
