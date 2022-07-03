/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { createDevice } from '@src/features/devices/devicesSlice';
import {
  NewDeviceContext,
  NewDeviceProvider,
} from '@features/addNewDevice/context/NewDeviceContext';
import { Wrapper } from '../../../wrapper';
import mockFile from '../../../helpers/mockFile';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

jest.mock('@src/features/devices/devicesSlice', () => ({
  ...jest.requireActual('@src/features/devices/devicesSlice'),
  __esModule: true,
  createDevice: jest.fn(),
}));

const feature = {
  title: 'RAM',
  description: '16 GB',
};
const newBrand = { id: 2, name: 'NEW_BRAND' };
const newCategory = { id: 2, name: 'NEW_CATEGORY' };
const newBaseInfo = {
  name: 'ASUS 5',
  quantity: '1',
  price: '12000',
};
const testImgFile = mockFile({
  name: 'some_image_for_device.jpg',
  type: 'image/jpg',
  size: 1000,
});

describe('[CONTEXT PROVIDER]: NewDeviceProvider', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);
    jest.clearAllMocks();
  });

  it('init values should be correct.', () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            return (
              <div>
                <p>isCreating: {value?.isCreating.toString()}</p>
                <p>hasValidAllSteps: {value?.hasValidAllSteps.toString()}</p>
                <p>brand: {String(value?.formState.brand)}</p>
                <p>category: {String(value?.formState.category)}</p>
                <p>info: {String(value?.formState.info)}</p>
                <p>imagesLength: {value?.formState.images.length}</p>
                <p>featuresLength: {value?.formState.features.length}</p>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/isCreating: false/i)).toBeTruthy();
    expect(getByText(/hasValidAllSteps: false/i)).toBeTruthy();
    expect(getByText(/brand: null/i)).toBeTruthy();
    expect(getByText(/category: null/i)).toBeTruthy();
    expect(getByText(/imagesLength: 0/i)).toBeTruthy();
    expect(getByText(/featuresLength: 0/i)).toBeTruthy();
  });

  it('should add a new brand to state successfully.', () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            const { brand } = value!.formState;
            const brandValue = brand === null ? 'none' : brand.name;
            return (
              <div>
                <h1>Brand: {brandValue}</h1>
                <button
                  type="button"
                  onClick={() => value?.addBrand({ brand: newBrand })}
                >
                  add brand
                </button>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/brand: none/i)).toBeInTheDocument();

    fireEvent.click(getByText(/add brand/i));

    expect(getByText(/brand: NEW_BRAND/i)).toBeInTheDocument();
  });

  it('should add a new category to state successfully.', () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            const { category } = value!.formState;
            const categoryValue = category === null ? 'none' : category.name;
            return (
              <div>
                <h1>category: {categoryValue}</h1>
                <button
                  type="button"
                  onClick={() => value?.addCategory({ category: newCategory })}
                >
                  add category
                </button>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/category: none/i)).toBeInTheDocument();

    fireEvent.click(getByText(/add category/i));

    expect(getByText(/category: NEW_CATEGORY/i)).toBeInTheDocument();
  });

  it('should add new base info about device successfully.', () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            const { info } = value!.formState;

            return (
              <div>
                <h1>device name: {info?.name}</h1>
                <h1>device quantity: {info?.quantity}</h1>
                <h1>device price: {info?.price}</h1>
                <button
                  type="button"
                  onClick={() => {
                    value!.addBaseInfo(newBaseInfo);
                  }}
                >
                  add base info
                </button>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText(/add base info/i));

    expect(getByText(/device name: ASUS 5/i)).toBeInTheDocument();
    expect(getByText(/device quantity: 1/i)).toBeInTheDocument();
    expect(getByText(/device price: 12000/i)).toBeInTheDocument();
  });

  it('should add a new image to state', () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            const { images } = value!.formState;

            return (
              <div>
                <h1>image: {images[0]?.id}</h1>
                <button
                  type="button"
                  onClick={() => {
                    value?.addImage(testImgFile);
                  }}
                >
                  add image
                </button>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText(/add image/i));

    expect(getByText(/image: some_image_for_device\.jpg/i)).toBeInTheDocument();
  });

  it('should add a new feature to state', () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            if (value === undefined) return null;

            const { features } = value.formState;

            const isUnique = value.checkIfNewFeatureUniqueByTitle(
              features[0]?.title,
            );

            return (
              <div>
                <h1>title: {features[0]?.title}</h1>
                <p>description: {features[0]?.description}</p>

                <span>isUnique: {String(isUnique)}</span>

                <button
                  type="button"
                  onClick={() => {
                    value?.addFeatureDetails(feature);
                  }}
                >
                  add feature
                </button>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    expect(getByText(/isUnique: true/i)).toBeInTheDocument();

    fireEvent.click(getByText(/add feature/i));

    expect(getByText(/isUnique: false/i)).toBeInTheDocument();
    expect(getByText(/title: RAM/i)).toBeInTheDocument();
    expect(getByText(/description: 16 GB/i)).toBeInTheDocument();
  });

  it('should delete item from state by click.', () => {
    const { getByText, queryByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            if (value === undefined) return null;

            const setup = () => {
              value.addBrand({ brand: newBrand });
              value.addFeatureDetails(feature);
              value.addImage(testImgFile);
              value.addBaseInfo(newBaseInfo);
              value.addCategory({ category: newCategory });
            };

            const clearAllState = () => {
              value.clearBrand();
              value.clearCategory();
              value.clearBaseInfo();
              value.deleteFeatureDetails(feature);

              const imgId = testImgFile.name;
              value.deleteImgById(imgId);
            };

            return (
              <div>
                <div>
                  <span>{value.formState.brand?.name}</span>
                  <span>{value.formState.category?.name}</span>
                  <span>{value.formState.info?.name}</span>
                  <span>{value.formState.features[0]?.title}</span>
                  <span>{value.formState.images[0]?.id}</span>
                </div>

                <button type="button" onClick={setup}>
                  setup form state
                </button>

                <button type="button" onClick={clearAllState}>
                  clear all state
                </button>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText(/setup form state/i));

    expect(getByText(newBrand.name)).toBeInTheDocument();
    expect(getByText(newCategory.name)).toBeInTheDocument();
    expect(getByText(newBaseInfo.name)).toBeInTheDocument();
    expect(getByText(feature.title)).toBeInTheDocument();
    expect(getByText(testImgFile.name)).toBeInTheDocument();

    fireEvent.click(getByText(/clear all state/i));

    expect(queryByText(newBrand.name)).toBeNull();
    expect(queryByText(newCategory.name)).toBeNull();
    expect(queryByText(newBaseInfo.name)).toBeNull();
    expect(queryByText(feature.title)).toBeNull();
    expect(queryByText(testImgFile.name)).toBeNull();
  });

  it('should save all info about device.', () => {
    const { getByText } = render(
      <NewDeviceProvider>
        <NewDeviceContext.Consumer>
          {(value) => {
            if (value === undefined) return null;

            const setup = () => {
              value.addBrand({ brand: newBrand });
              value.addFeatureDetails(feature);
              value.addImage(testImgFile);
              value.addBaseInfo(newBaseInfo);
              value.addCategory({ category: newCategory });
            };

            return (
              <div>
                <button type="button" onClick={setup}>
                  setup form state
                </button>

                <button type="button" onClick={value.save}>
                  save
                </button>
              </div>
            );
          }}
        </NewDeviceContext.Consumer>
      </NewDeviceProvider>,
      { wrapper: Wrapper },
    );

    fireEvent.click(getByText(/save/i));

    expect(createDevice).not.toBeCalled();

    fireEvent.click(getByText(/setup form state/i));

    fireEvent.click(getByText(/save/i));

    expect(createDevice).toBeCalledWith({
      brandId: newBrand.id,
      categoryId: newCategory.id,
      features: [feature],
      images: [testImgFile],
      info: newBaseInfo,
    });
  });
});
