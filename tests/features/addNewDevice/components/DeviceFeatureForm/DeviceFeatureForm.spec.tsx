/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
// eslint-disable-next-line max-len
import DeviceFeatureFormView from '@features/addNewDevice/components/DeviceFeatureForm/DeviceFeatureFormView';
import { Wrapper } from '../../../../wrapper';
import { newDeviceContextValuesMock } from '../../../../mocks/data';

const state = {
  devices: { isCreating: false, items: [] },
};

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('[COMPONENTS]: DeviceFeatureForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('next button should be disabled by default', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <DeviceFeatureFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const NextBtn = getByText(/next/i) as HTMLButtonElement;

    expect(NextBtn.disabled).toBeTruthy();
  });

  test('should have prev link.', async () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <DeviceFeatureFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const link = getByText(/prev/i) as HTMLLinkElement;

    expect(link.getAttribute('href')).toBe('/new/device-base-info');
  });

  test('should change title and description values.', async () => {
    const { getByText, getByLabelText } = render(
      <NewDeviceProvider>
        <DeviceFeatureFormView />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const TitleInput = getByLabelText(/title/i) as HTMLInputElement;
    const DescriptionInput = getByLabelText(/description/i) as HTMLInputElement;

    const AddBtn = getByText(/add/i) as HTMLButtonElement;

    expect(AddBtn.disabled).toBeTruthy();

    fireEvent.change(TitleInput, { target: { value: 'RAM' } });
    fireEvent.change(DescriptionInput, { target: { value: '64 GB' } });

    await waitFor(() => {
      expect(TitleInput.value).toBe('RAM');
      expect(DescriptionInput.value).toBe('64 GB');
    });

    await waitFor(() => {
      expect(AddBtn.disabled).toBeFalsy();
    });
  });

  test('next button should be available when features was already added.', async () => {
    const addFeatureDetailsMock = jest.fn();

    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addFeatureDetails: addFeatureDetailsMock,
          formState: {
            ...newDeviceContextValuesMock.formState,
            features: [{ title: 'RAM', description: '64 GB' }],
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <DeviceFeatureFormView />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const NextBtn = getByText(/next/i) as HTMLButtonElement;
    expect(NextBtn.disabled).toBeFalsy();

    fireEvent.click(NextBtn);

    expect(mockedNavigate).toBeCalledWith('/new/device-images');
  });
  // eslint-disable-next-line max-len
  test('should not add feature to state in case feature with the same title was added earlier.', async () => {
    const addFeatureDetailsMock = jest.fn();

    const { getByText, getByLabelText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addFeatureDetails: addFeatureDetailsMock,
          formState: {
            ...newDeviceContextValuesMock.formState,
            features: [{ title: 'RAM', description: '64 GB' }],
          },
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <DeviceFeatureFormView />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const TitleInput = getByLabelText(/title/i) as HTMLInputElement;
    const DescriptionInput = getByLabelText(/description/i) as HTMLInputElement;

    const AddBtn = getByText(/add/i) as HTMLButtonElement;

    expect(AddBtn.disabled).toBeTruthy();

    fireEvent.change(TitleInput, { target: { value: 'RAM' } });
    fireEvent.change(DescriptionInput, { target: { value: '64 GB' } });

    expect(AddBtn.disabled).toBeFalsy();
    fireEvent.click(AddBtn);

    await waitFor(() => {
      expect(addFeatureDetailsMock).not.toBeCalled();
    });
  });

  test('should add a new feature to state', async () => {
    const addFeatureDetailsMock = jest.fn();

    const { getByText, getByLabelText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          checkIfNewFeatureUniqueByTitle: () => true,
          addFeatureDetails: addFeatureDetailsMock,
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <DeviceFeatureFormView />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const TitleInput = getByLabelText(/title/i) as HTMLInputElement;
    const DescriptionInput = getByLabelText(/description/i) as HTMLInputElement;

    const AddBtn = getByText(/add/i) as HTMLButtonElement;

    expect(AddBtn.disabled).toBeTruthy();

    fireEvent.change(TitleInput, { target: { value: 'SSD' } });
    fireEvent.change(DescriptionInput, { target: { value: '512 GB' } });

    expect(AddBtn.disabled).toBeFalsy();

    fireEvent.click(AddBtn);

    await waitFor(() => {
      expect(addFeatureDetailsMock).toBeCalledWith({
        description: '512 GB',
        title: 'SSD',
      });
    });
  });
});
