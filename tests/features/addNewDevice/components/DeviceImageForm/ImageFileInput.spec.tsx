/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@src/features/addNewDevice/context/NewDeviceContext';
// eslint-disable-next-line max-len
import ImageFileInput from '@features/addNewDevice/components/ImageForm/ImageFileInput';
import { Wrapper } from '../../../../wrapper';
import { newDeviceContextValuesMock } from '../../../../mocks/data';
import mockFile from '../../../../helpers/mockFile';

const state = {
  devices: { isCreating: false, items: [] },
};

describe('[COMPONENTS]: ImageFileInput', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('files should be selected.', async () => {
    const { getByLabelText, getByText } = render(
      <NewDeviceProvider>
        <ImageFileInput />
      </NewDeviceProvider>,
      {
        wrapper: (props: { children: React.ReactNode }) => {
          return <Wrapper {...props} state={state} />;
        },
      },
    );

    const imgFile1 = mockFile({
      name: 'some_image_for_device.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const imgFile2 = mockFile({
      name: 'test_img.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const imgFile3 = mockFile({
      name: 'test_img_1.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const files = [imgFile1, imgFile2, imgFile3];

    const FileInput = getByLabelText(/choose files/i) as HTMLInputElement;

    fireEvent.change(FileInput, { target: { files } });

    await waitFor(() => {
      expect(getByText(`${files.length} selected files`)).toBeInTheDocument();
    });
  });

  test('should add every selected image to state', async () => {
    const addImageMock = jest.fn();

    const { getByLabelText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addImage: addImageMock,
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <ImageFileInput />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const imgFile1 = mockFile({
      name: 'some_image_for_device.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const imgFile2 = mockFile({
      name: 'test_img.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const imgFile3 = mockFile({
      name: 'test_img_1.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const files = [imgFile1, imgFile2, imgFile3];

    const FileInput = getByLabelText(/choose files/i) as HTMLInputElement;

    fireEvent.change(FileInput, { target: { files } });

    await waitFor(() => {
      for (const file of files) {
        expect(addImageMock).toBeCalledWith(file);
      }
    });
  });
  // eslint-disable-next-line max-len
  test('should not add files to state when user selects more than 5 images.', async () => {
    const addImageMock = jest.fn();

    const { getByLabelText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addImage: addImageMock,
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <ImageFileInput />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const imgFile1 = mockFile({
      name: 'some_image_for_device.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const imgFile2 = mockFile({
      name: 'test_img.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const imgFile3 = mockFile({
      name: 'test_img_1.jpg',
      type: 'image/jpg',
      size: 1000,
    });

    const files = [imgFile1, imgFile2, imgFile3, imgFile1, imgFile2, imgFile3];

    const FileInput = getByLabelText(/choose files/i) as HTMLInputElement;

    fireEvent.change(FileInput, { target: { files } });

    await waitFor(() => {
      expect(addImageMock).not.toBeCalled();
    });
  });

  test('should not do anything when files are equal to null', async () => {
    const addImageMock = jest.fn();

    const { getByLabelText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          addImage: addImageMock,
        }}
      >
        <NewDeviceContext.Consumer>
          {() => <ImageFileInput />}
        </NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const FileInput = getByLabelText(/choose files/i) as HTMLInputElement;

    fireEvent.change(FileInput, { target: { files: null } });

    await waitFor(() => {
      expect(addImageMock).not.toBeCalled();
    });
  });
});
