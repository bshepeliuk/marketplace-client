import React from 'react';
// eslint-disable-next-line max-len
import AllDevicesListItem from '@features/categories/components/CategoriesList/AllDevicesListItem';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

describe('[COMPONENTS]: AllDevicesListItem', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => <AllDevicesListItem />,
    });

    const AllLink = getByText(/all/i);

    expect(AllLink.getAttribute('href')).toBe('/');
  });
});
