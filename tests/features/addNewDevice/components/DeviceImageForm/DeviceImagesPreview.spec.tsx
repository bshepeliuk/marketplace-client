/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { NewDeviceContext, NewDeviceProvider } from '@src/features/addNewDevice/context/NewDeviceContext';
import useGetImgURLsByFiles from '@src/common/hooks/useGetImgURLsByFiles';

import DeviceImagesPreview from '@features/addNewDevice/components/ImageForm/DeviceImagesPreview';
import { Wrapper } from '../../../../wrapper';
import { newDeviceContextValuesMock } from '../../../../mocks/data';

jest.mock('@src/common/hooks/useGetImgURLsByFiles');

const images = [
  { id: 'img1', url: 'data:image/jpeg;base64,/9j/4AAQSkZJRg1' },
  { id: 'img2', url: 'data:image/jpeg;base64,/9j/4AAQSkZJRg2' },
];

describe('[COMPONENTS]: DeviceImagesPreview', () => {
  beforeEach(() => {
    (useGetImgURLsByFiles as jest.Mock).mockImplementation(() => images);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render image preview list', async () => {
    const { getAllByText, getAllByAltText } = render(
      <NewDeviceProvider>
        <DeviceImagesPreview />
      </NewDeviceProvider>,
      {
        wrapper: Wrapper,
      },
    );

    expect(getAllByAltText(/preview/i)).toHaveLength(images.length);
    expect(getAllByText(/delete/i)).toHaveLength(images.length);
  });

  test('should delete preview image by click on delete btn.', async () => {
    const previewImg = images[0];

    (useGetImgURLsByFiles as jest.Mock).mockImplementation(() => [previewImg]);

    const deleteImgByIdMock = jest.fn();

    const { getByText } = render(
      <NewDeviceContext.Provider
        value={{
          ...newDeviceContextValuesMock,
          deleteImgById: deleteImgByIdMock,
        }}
      >
        <NewDeviceContext.Consumer>{() => <DeviceImagesPreview />}</NewDeviceContext.Consumer>
      </NewDeviceContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const DeleteBtn = getByText(/delete/i);

    expect(DeleteBtn).toBeInTheDocument();

    fireEvent.click(DeleteBtn);

    expect(deleteImgByIdMock).toBeCalledWith(previewImg.id);
  });
});
