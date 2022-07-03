/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
import SaveBtn from '@features/addNewDevice/components/SaveBtn';

import { Wrapper } from '../../../wrapper';
import { newDeviceContextValuesMock } from '../../../mocks/data';
import mockFile from '../../../helpers/mockFile';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

const state = {
  devices: { isCreating: false, items: [] },
};

describe('[COMPONENTS]: SaveBtn (save a new device)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('save button should be disabled by default', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <SaveBtn />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    const saveBtn = getByText(/save/i) as HTMLButtonElement;

    expect(saveBtn).toBeInTheDocument();
    expect(saveBtn.disabled).toBeTruthy();
  });
  // eslint-disable-next-line max-len
  test('should save a new device successfully and redirect to created device.', async () => {
    const imgFile = mockFile({
      name: 'test_img_1.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const features = [{ id: 2, title: 'RAM', description: '64 GB' }];

    const baseInfo = {
      name: 'HP Pavillion 17',
      quantity: '1',
      price: '25000',
    };

    const category = {
      id: 1,
      name: 'laptops',
    };

    const brand = {
      id: 1,
      name: 'HP',
    };

    const images = [{ id: 'someId', file: imgFile }];

    const createdDeviceId = 2;

    const saveMock = jest.fn().mockReturnValueOnce(createdDeviceId);

    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          save: saveMock,
          hasValidAllSteps: true,
          formState: {
            ...newDeviceContextValuesMock.formState,
            features,
            brand,
            category,
            images,
            info: baseInfo,
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <SaveBtn />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: (props: { children: React.ReactNode }) => (
          <Wrapper {...props} state={state} />
        ),
      },
    );

    const saveBtn = getByText(/save/i) as HTMLButtonElement;

    expect(saveBtn).toBeInTheDocument();
    expect(saveBtn.disabled).toBeFalsy();

    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('/devices/2');
      expect(saveMock).toReturnWith(createdDeviceId);
    });
  });
});
