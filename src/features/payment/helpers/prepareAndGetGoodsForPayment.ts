import { IDeviceImage, IDeviceWithCount } from '@src/features/devices/types';

interface IProps {
  goods: IDeviceWithCount[];
  customerId: number;
}

const prepareAndGetGoodsForPayment = ({ goods, customerId }: IProps) => {
  return goods.map((item) => ({
    quantity: item.count,
    price_data: {
      currency: 'USD',
      unit_amount: item.price * 100,
      product_data: {
        name: item.name,
        metadata: {
          sellerId: item.userId,
          deviceId: item.id,
          customerId,
        },
        description: `id: ${item.id}`,
        images: item.images.length > 0 ? [(item.images[0] as IDeviceImage).url] : [],
      },
    },
  }));
};

export default prepareAndGetGoodsForPayment;
