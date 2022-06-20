import React from 'react';
import { fireEvent } from '@testing-library/react';
import CartItemView from '@features/cart/components/CartItemView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const device = {
  id: 2,
  name: 'HP Pavillion 15 eh1021-ua',
  price: 33448,
  brandId: 2,
  typeId: 1,
  userId: 1,
  quantity: 1,
  images: [],
  info: [],
  count: 1,
  createdAt: '2022-01-05T16:57:37.787Z',
  updatedAt: '2022-01-05T16:57:37.787Z',
};

describe('[COMPONENTS]: CartItemView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render cart item element.', async () => {
    const { getByText, container } = setupAndRenderComponent({
      component: () => (
        <CartItemView
          data={{
            updateCountById: jest.fn(),
            items: [device],
          }}
          index={0}
          style={{ width: 300, height: 80, top: 10 }}
        />
      ),
      state: {},
    });

    expect(getByText(device.name)).toBeInTheDocument();
    expect(
      getByText((content) => content.startsWith(String(device.price))),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-increment-count-btn]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-decrease-count-btn]'),
    ).toBeInTheDocument();
  });

  test('should update count of devices on +/- btn click and change sum.', async () => {
    const updateCountMock = jest.fn();

    const { getByText, container } = setupAndRenderComponent({
      component: () => (
        <CartItemView
          data={{
            updateCountById: updateCountMock,
            items: [device],
          }}
          index={0}
          style={{ width: 300, height: 80, top: 10 }}
        />
      ),
      state: {},
    });

    const IncrementBtn = container.querySelector(
      '[data-increment-count-btn]',
    ) as HTMLButtonElement;

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 1 });
    expect(IncrementBtn).toBeInTheDocument();

    fireEvent.click(IncrementBtn);

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 2 });

    fireEvent.click(IncrementBtn);

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 3 });

    fireEvent.click(IncrementBtn);

    const LAST_COUNT_VALUE = 4;

    expect(updateCountMock).toBeCalledWith({ id: 2, count: LAST_COUNT_VALUE });

    const SUM = device.price * LAST_COUNT_VALUE;

    expect(
      getByText((content) => content.startsWith(String(SUM))),
    ).toBeInTheDocument();

    const DecreaseBtn = container.querySelector(
      '[data-decrease-count-btn]',
    ) as HTMLButtonElement;

    fireEvent.click(DecreaseBtn);

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 1 });

    fireEvent.click(DecreaseBtn);

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 2 });

    fireEvent.click(DecreaseBtn);

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 3 });

    fireEvent.click(DecreaseBtn);

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 1 });

    fireEvent.click(DecreaseBtn);

    expect(updateCountMock).toBeCalledWith({ id: 2, count: 1 });

    expect(
      getByText((content) => content.startsWith(String(device.price))),
    ).toBeInTheDocument();
  });
});
