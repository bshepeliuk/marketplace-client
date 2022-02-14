import { Provider } from 'react-redux';
import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// TODO: types for state
interface Props {
  state: any;
  component: () => ReactElement;
}

const mockStore = configureMockStore([thunk]);

const setupAndRenderComponent = ({ state, component: Component }: Props) => {
  const storeMock = mockStore(state);

  return render(
    <Provider store={storeMock}>
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    </Provider>,
  );
};

export default setupAndRenderComponent;
