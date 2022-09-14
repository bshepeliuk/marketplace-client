import { fireEvent } from '@testing-library/dom';
import HeaderItemView from '@features/comparison/components/Header/HeaderItemView';
import { comparisonActions } from '@src/features/comparison/comparisonSlice';
import useMakePayment from '@features/payment/pages/hooks/useMakePayment';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';
import { deviceMock } from '../../../mocks/data';
import { mockStripe } from '../../../mocks/stripe';

const deleteFromComparisonByIdMock = jest.spyOn(comparisonActions, 'deleteById');

jest.mock('@stripe/react-stripe-js', () => ({
  ...jest.requireActual('@stripe/react-stripe-js'),
  useStripe: () => mockStripe(),
}));

jest.mock('@features/payment/pages/hooks/useMakePayment');

describe('[COMPONENTS]: HeaderItemView', () => {
  const payMethodMock = jest.fn();

  beforeAll(() => {
    (useMakePayment as jest.Mock).mockReturnValue({
      pay: payMethodMock,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render header cell.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: HeaderItemView,
      props: {
        device: deviceMock,
        onDragEnter: jest.fn(),
        onDragLeave: jest.fn(),
        onDragEnd: jest.fn(),
      },
    });

    expect(getByText(deviceMock.name, { exact: false })).toBeInTheDocument();
    expect(getByText(deviceMock.price, { exact: false })).toBeInTheDocument();
  });

  test('should delete device from comparison.', () => {
    const { container } = setupAndRenderComponent({
      state: rootStateMock,
      component: HeaderItemView,
      props: {
        device: deviceMock,
        onDragEnter: jest.fn(),
        onDragLeave: jest.fn(),
        onDragEnd: jest.fn(),
      },
    });

    const DeleteButton = container.querySelector('[data-button="delete-button"]') as HTMLButtonElement;

    fireEvent.click(DeleteButton);

    expect(deleteFromComparisonByIdMock).toBeCalledWith({ deviceId: deviceMock.id });
  });

  test('should pay for device on pay button click.', () => {
    const { container } = setupAndRenderComponent({
      state: rootStateMock,
      component: HeaderItemView,
      props: {
        device: deviceMock,
        onDragEnter: jest.fn(),
        onDragLeave: jest.fn(),
        onDragEnd: jest.fn(),
      },
    });

    const PayButton = container.querySelector('[data-button="pay-button"]') as HTMLButtonElement;

    fireEvent.click(PayButton);

    expect(payMethodMock).toBeCalledTimes(1);
  });
});
