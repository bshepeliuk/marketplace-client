import { Provider } from 'react-redux';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import store from '@src/app/store';

const wrapper = ({ children }: { children: HTMLElement }) => (
  <Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
);

export default wrapper;
