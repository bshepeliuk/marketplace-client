/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import useCheckStep from '@features/addNewDevice/hooks/useCheckStep';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@features/addNewDevice/context/NewDeviceContext';
import { renderHook } from '@testing-library/react-hooks';
import store from '@src/app/store';
import mockFile from '../../../helpers/mockFile';
import { newDeviceContextValuesMock } from '../../../mocks/data';

describe('[HOOK]: useCheckStep', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should have false value for all steps by default.', () => {
    const { result } = renderHook(useCheckStep, {
      wrapper: (props: { children: React.ReactNode }) => (
        <Provider store={store}>
          <MemoryRouter>
            <NewDeviceProvider>{props.children}</NewDeviceProvider>
          </MemoryRouter>
        </Provider>
      ),
    });

    const hasValidFirstStep = result.current.checkIfValidByStepId(1);
    const hasValidSecondStep = result.current.checkIfValidByStepId(2);
    const hasValidThirdStep = result.current.checkIfValidByStepId(3);
    const hasValidFourthStep = result.current.checkIfValidByStepId(4);
    const hasValidFifthStep = result.current.checkIfValidByStepId(5);

    expect(hasValidFirstStep).toBeFalsy();
    expect(hasValidSecondStep).toBeFalsy();
    expect(hasValidThirdStep).toBeFalsy();
    expect(hasValidFourthStep).toBeFalsy();
    expect(hasValidFifthStep).toBeFalsy();
  });
  // eslint-disable-next-line max-len
  test('in case details about all steps were added to state, all steps should be valid.', () => {
    const testImgFile = mockFile({
      name: 'device_new.jpg',
      type: 'image/jpg',
      size: 50000,
    });

    const formState = {
      brand: { id: 1, name: 'BRAND' },
      category: { id: 1, name: 'CATEGORY' },
      info: { id: 1, name: 'ASUS', quantity: '1', price: '1' },
      images: [
        {
          id: 'image.jpg',
          file: testImgFile,
        },
      ],
      features: [{ title: 'RAM', description: '16 GB' }],
    };

    const { result } = renderHook(useCheckStep, {
      wrapper: (props: { children: React.ReactNode }) => (
        <Provider store={store}>
          <MemoryRouter>
            <NewDeviceContext.Provider
              value={{ ...newDeviceContextValuesMock, formState }}
            >
              {props.children}
            </NewDeviceContext.Provider>
          </MemoryRouter>
        </Provider>
      ),
    });

    const hasValidFirstStep = result.current.checkIfValidByStepId(1);
    const hasValidSecondStep = result.current.checkIfValidByStepId(2);
    const hasValidThirdStep = result.current.checkIfValidByStepId(3);
    const hasValidFourthStep = result.current.checkIfValidByStepId(4);
    const hasValidFifthStep = result.current.checkIfValidByStepId(5);

    expect(hasValidFirstStep).toBeTruthy();
    expect(hasValidSecondStep).toBeTruthy();
    expect(hasValidThirdStep).toBeTruthy();
    expect(hasValidFourthStep).toBeTruthy();
    expect(hasValidFifthStep).toBeTruthy();
  });
});
