import React from 'react';
import { fireEvent } from '@testing-library/react';
import GetAllDevicesButton from '@features/categories/atoms/GetAllDevicesButton';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';

const mockGetAllMethod = jest.fn();

jest.mock('@src/features/devices/hooks/useGetDevicesByRequest', () => ({
  ...jest.requireActual('@src/features/devices/hooks/useGetDevicesByRequest'),
  __esModule: true,
  default: () => ({ getAll: mockGetAllMethod }),
}));

describe('[ATOMS]: GetAllDevicesButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('init render.', () => {
    const onAllClick = jest.fn();

    const { getByText } = setupAndRenderComponent({
      state: {},
      component: () => (
        <GetAllDevicesButton onAllClick={onAllClick} active={null} />
      ),
    });

    const AllBtn = getByText(/all/i);

    fireEvent.click(AllBtn);

    expect(onAllClick).toBeCalledTimes(1);
    expect(mockGetAllMethod).toBeCalledTimes(1);
  });
});
