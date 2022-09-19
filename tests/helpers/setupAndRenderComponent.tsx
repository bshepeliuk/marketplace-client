import { Provider } from 'react-redux';
import React, { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// TODO: types for state
interface Props {
  state: any;
  // eslint-disable-next-line no-unused-vars
  component: (props: any) => ReactElement | null;
  props?: any;
}

const mockStore = configureMockStore([thunk]);

const setupAndRenderComponent = ({ state, props, component: Component }: Props) => {
  const storeMock = mockStore(state);

  return render(
    <Provider store={storeMock}>
      <MemoryRouter>
        <Component {...props} />
      </MemoryRouter>
    </Provider>,
  );
};

export default setupAndRenderComponent;
