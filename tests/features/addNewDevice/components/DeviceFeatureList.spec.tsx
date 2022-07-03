/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
import DeviceFeatureList from '@features/addNewDevice/components/DeviceFeatureList';

import { Wrapper } from '../../../wrapper';
import { newDeviceContextValuesMock } from '../../../mocks/data';

describe('[COMPONENTS]: DeviceFeatureList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render features from state', async () => {
    const features = [
      { title: 'RAM', description: '64 GB' },
      { title: 'SSD', description: '1 TB' },
    ];

    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          formState: {
            ...newDeviceContextValuesMock.formState,
            features,
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <DeviceFeatureList />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    for (const feature of features) {
      expect(getByText(feature.title)).toBeInTheDocument();
      expect(getByText(feature.description)).toBeInTheDocument();
    }
  });

  test('should delete feature from state', async () => {
    const deleteFeatureDetailsMock = jest.fn();

    const features = [{ title: 'RAM', description: '64 GB' }];

    const { getByTestId } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          deleteFeatureDetails: deleteFeatureDetailsMock,
          formState: {
            ...newDeviceContextValuesMock.formState,
            features,
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <DeviceFeatureList />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const DeleteBtn = getByTestId(/delete-feature-btn/) as HTMLButtonElement;

    fireEvent.click(DeleteBtn);

    expect(deleteFeatureDetailsMock).toBeCalledWith(features[0]);
  });

  test('should not render feature list when it is empty', async () => {
    const { queryByText } = render(
      <NewDeviceProvider>
        <DeviceFeatureList />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    expect(queryByText(/title/i)).toBeNull();
    expect(queryByText(/description/i)).toBeNull();
    expect(queryByText(/action/i)).toBeNull();
  });
});
