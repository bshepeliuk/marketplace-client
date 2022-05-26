import { IDeviceImage, IDeviceWithCount } from '@src/features/devices/types';

const prepareAndGetGoodsForPayment = (data: IDeviceWithCount[]) => {
  return data.map((item) => ({
    quantity: item.count,
    price_data: {
      currency: 'USD',
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        description: `id: ${item.id}`,
        images:
          item.images.length > 0 ? [(item.images[0] as IDeviceImage).url] : [],
      },
    },
  }));
};

export default prepareAndGetGoodsForPayment;
