import NotFoundView from '@src/features/notFound/NotFoundView';
import React from 'react';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

describe('[PAGES]: NotFoundView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => <NotFoundView />,
    });

    expect(getByText(/Not Found./i)).toBeInTheDocument();
  });
});
