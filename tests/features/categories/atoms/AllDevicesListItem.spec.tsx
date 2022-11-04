import React from 'react';

import AllDevicesListItem from '@src/features/categories/components/CategoriesList/AllCategoriesButton';
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
