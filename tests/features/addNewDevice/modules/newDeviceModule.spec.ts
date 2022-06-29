/* eslint-disable max-len */
import newDeviceReducer, {
  newDeviceActions,
  newDeviceInitState,
} from '@src/features/addNewDevice/modules/newDeviceModule';

describe('[MODULE]: add new device', () => {
  test('should return initial state when action type does not match', () => {
    expect(newDeviceReducer(newDeviceInitState, {} as any)).toEqual(
      newDeviceInitState,
    );
  });

  test('should save a new brand to state', () => {
    const brand = {
      id: 1,
      name: 'ASUS',
    };

    expect(
      newDeviceReducer(
        newDeviceInitState,
        newDeviceActions.addBrand({ brand }),
      ),
    ).toEqual({ ...newDeviceInitState, brand });
  });

  test('should save a new category to state', () => {
    const category = {
      id: 1,
      name: 'laptops',
    };

    expect(
      newDeviceReducer(
        newDeviceInitState,
        newDeviceActions.addCategory({ category }),
      ),
    ).toEqual({ ...newDeviceInitState, category });
  });

  test('should save base info about device to state', () => {
    const info = {
      id: 1,
      name: 'ASUS 15',
      quantity: '1',
      price: '10000',
    };

    expect(
      newDeviceReducer(newDeviceInitState, newDeviceActions.addBaseInfo(info)),
    ).toEqual({ ...newDeviceInitState, info });
  });

  test('should save device feature to state', () => {
    const feature = {
      id: 1,
      title: 'RAM',
      description: '16 GB',
    };

    expect(
      newDeviceReducer(
        newDeviceInitState,
        newDeviceActions.addFeatureDetails(feature),
      ),
    ).toEqual({ ...newDeviceInitState, features: [feature] });
  });

  test('should save image file for device.', () => {
    const image = {
      id: 'some_image.jpg',
      file: '' as unknown as File,
    };

    expect(
      newDeviceReducer(newDeviceInitState, newDeviceActions.addImage(image)),
    ).toEqual({ ...newDeviceInitState, images: [image] });
  });

  test('should remove image from state by Id', () => {
    const image = {
      id: 'some_image.jpg',
      file: '' as unknown as File,
    };

    expect(
      newDeviceReducer(
        { ...newDeviceInitState, images: [image] },
        newDeviceActions.deleteImageById(image.id),
      ),
    ).toEqual({ ...newDeviceInitState, images: [] });
  });

  test('should remove added brand from state.', () => {
    const brand = {
      id: 1,
      name: 'ASUS',
    };

    expect(
      newDeviceReducer(
        { ...newDeviceInitState, brand },
        newDeviceActions.removeBrand(),
      ),
    ).toEqual({ ...newDeviceInitState, brand: null });
  });

  test('should remove added category from state.', () => {
    const category = {
      id: 1,
      name: 'laptops',
    };

    expect(
      newDeviceReducer(
        { ...newDeviceInitState, category },
        newDeviceActions.removeCategory(),
      ),
    ).toEqual({ ...newDeviceInitState, category: null });
  });

  test('should remove passed feature by title and description.', () => {
    const feature = {
      id: 1,
      title: 'RAM',
      description: '16 GB',
    };

    expect(
      newDeviceReducer(
        { ...newDeviceInitState, features: [feature] },
        newDeviceActions.deleteDeviceFeature(feature),
      ),
    ).toEqual({ ...newDeviceInitState, features: [] });
  });

  test('should remove base info from state', () => {
    const info = {
      id: 1,
      name: 'ASUS 15',
      quantity: '1',
      price: '10000',
    };

    expect(
      newDeviceReducer(
        { ...newDeviceInitState, info },
        newDeviceActions.removeBaseInfo(),
      ),
    ).toEqual({ ...newDeviceInitState, info: null });
  });
});
