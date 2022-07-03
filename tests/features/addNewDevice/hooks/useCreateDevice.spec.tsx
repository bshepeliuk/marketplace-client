import * as ReactRedux from 'react-redux';
import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useCreateDevice from '@features/addNewDevice/hooks/useCreateDevice';
import { createDevice } from '@src/features/devices/devicesSlice';
import { Wrapper } from '../../../wrapper';
import mockFile from '../../../helpers/mockFile';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  createDevice: jest.fn(),
}));

describe('[HOOK]: useCreateDevice', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
  });

  test('should have init state and method for create a new device', () => {
    const { result } = renderHook(useCreateDevice, {
      wrapper: Wrapper,
    });

    expect(result.current.isCreating).toBeFalsy();
    expect(result.current.isCreatingError).toBeFalsy();
    expect(typeof result.current.addNewDevice).toBe('function');
  });

  test('addNewDevice should call createDevice thunk', async () => {
    const { result } = renderHook(useCreateDevice, {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} />,
    });

    const testImgFile = mockFile({
      name: 'device_new.jpg',
      type: 'image/jpg',
      size: 50000,
    });

    const newDeviceDetails = {
      brandId: 1,
      categoryId: 1,
      info: { id: 1, name: 'ASUS', quantity: '1', price: '1' },
      images: [testImgFile],
      features: [{ title: 'RAM', description: '16 GB' }],
    };

    act(() => {
      result.current.addNewDevice(newDeviceDetails);
    });

    expect(dispatch).toBeCalledTimes(1);
    expect(createDevice).toBeCalledWith(newDeviceDetails);
  });
});
