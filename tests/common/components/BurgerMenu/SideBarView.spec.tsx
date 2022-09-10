import React from 'react';
import { fireEvent } from '@testing-library/dom';
import { normalize } from 'normalizr';

import CategoryLinks from '@common/components/BurgerMenu/components/CategoryLinks/CategoryLinks';
import { CategoryEntities, ICategory } from '@src/features/categories/types';
import { routes } from '@src/app/Router';
import { CategoriesSchema } from '@src/common/normalizeSchemas';
import SideBarView from '@src/common/components/BurgerMenu/components/SideBarView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { categories } from '../../../mocks/data';

const { result, entities } = normalize<ICategory, CategoryEntities, number[]>(categories, CategoriesSchema);

describe('[COMPONENTS]: SideBarView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have links to all categories from list.', () => {
    const { getByText } = setupAndRenderComponent({
      state: {
        entities,
        categories: {
          isLoading: false,
          isError: false,
          items: result,
        },
      },
      component: () => (
        <SideBarView width={300} onClose={jest.fn()} isOpen>
          <CategoryLinks />
        </SideBarView>
      ),
    });

    for (const category of categories) {
      const link = getByText(category.name, { exact: false });

      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe(`${routes.devices}?categoryId=${category.id}`);
    }
  });

  test('should close sidebar when user clicked outside.', () => {
    const onCloseMock = jest.fn();

    setupAndRenderComponent({
      state: {
        entities,
        categories: {
          isLoading: false,
          isError: false,
          items: result,
        },
      },
      component: () => (
        <SideBarView onClose={onCloseMock} isOpen width={350}>
          <CategoryLinks />
        </SideBarView>
      ),
      props: {
        onClose: onCloseMock,
        isOpen: true,
      },
    });

    fireEvent.mouseDown(document.body);

    expect(onCloseMock).toBeCalledTimes(1);
  });

  test('should not close sidebar when click was inside sidebar.', () => {
    const onCloseMock = jest.fn();

    const { getByText } = setupAndRenderComponent({
      state: {
        entities,
        categories: {
          isLoading: false,
          isError: false,
          items: result,
        },
      },
      component: () => (
        <SideBarView onClose={onCloseMock} isOpen width={350}>
          <CategoryLinks />
        </SideBarView>
      ),
      props: {
        onClose: onCloseMock,
        isOpen: true,
      },
    });

    const [category] = categories;

    fireEvent.mouseDown(getByText(category.name, { exact: false }));

    expect(onCloseMock).toBeCalledTimes(0);
  });
});
