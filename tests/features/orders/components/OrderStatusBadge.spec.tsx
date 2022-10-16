import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import OrderStatusBadge from '@src/features/orders/components/OrderAccordion/components/OrderStatusBadge';
import { OrderStatus } from '@src/features/orders/constants';

jest.mock('react-toastify');

describe('[COMPONENTS]: OrderStatusBadge', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render status badge.', async () => {
    render(<OrderStatusBadge value={OrderStatus.paid} />);

    expect(screen.getByText(OrderStatus.paid, { exact: false })).toBeInTheDocument();
  });
});
