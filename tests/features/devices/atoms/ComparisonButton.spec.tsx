import ComparisonButton from '@src/features/devices/atoms/ComparisonButton';
import { comparisonActions } from '@src/features/comparison/comparisonSlice';
import { fireEvent } from '@testing-library/dom';
import { COMPARISON_STORAGE_KEY } from '@src/features/comparison/constants';
import { deviceMock } from '../../../mocks/data';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { rootStateMock } from '../../../mocks/stateMock';

const addToComparisonMock = jest.spyOn(comparisonActions, 'add');
const deleteFromComparisonMock = jest.spyOn(comparisonActions, 'deleteById');

describe('[ATOMS]: DeviceFeatureList', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should render comparison button.', () => {
    const { container } = setupAndRenderComponent({
      state: rootStateMock,
      component: ComparisonButton,
      props: {
        device: deviceMock,
      },
    });

    const comparisonButton = container.querySelector('[data-button="comparison"]');

    expect(comparisonButton).toBeInTheDocument();
  });

  test('should add device to comparison.', () => {
    const { container } = setupAndRenderComponent({
      state: rootStateMock,
      component: ComparisonButton,
      props: {
        device: deviceMock,
      },
    });

    const comparisonButton = container.querySelector('[data-button="comparison"]') as HTMLElement;

    fireEvent.click(comparisonButton);

    expect(addToComparisonMock).toBeCalledWith({ device: deviceMock });
  });

  test('in case device with the same ID was previously added, should delete a device from comparison.', () => {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify([deviceMock]));

    const { container } = setupAndRenderComponent({
      state: rootStateMock,
      component: ComparisonButton,
      props: {
        device: deviceMock,
      },
    });

    const comparisonButton = container.querySelector('[data-button="comparison"]') as HTMLElement;

    fireEvent.click(comparisonButton);

    expect(deleteFromComparisonMock).toBeCalledWith({ deviceId: deviceMock.id });
  });
});
