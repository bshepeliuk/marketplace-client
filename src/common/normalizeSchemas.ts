import { schema } from 'normalizr';

export const CategorySchema = new schema.Entity('categories', {});
export const DeviceImagesSchema = new schema.Entity('images', {});

export const AddressSchema = new schema.Entity('addresses', {});
export const OrderSchema = new schema.Entity('orders', {});
export const DeviceInfoSchema = new schema.Entity('info', {});
export const RatingSchema = new schema.Entity('ratings', {});
export const CommentSchema = new schema.Entity('comments', {});
export const DeviceSchema = new schema.Entity('devices', {
  images: [DeviceImagesSchema],
  info: [DeviceInfoSchema],
  ratings: [RatingSchema],
  comments: [CommentSchema],
});

export const OrderDeviceSchema = new schema.Entity('devices', {
  images: [DeviceImagesSchema],
  info: [DeviceInfoSchema],
  ratings: [RatingSchema],
  comments: [CommentSchema],
  order: OrderSchema,
});

export const PurchaseSchema = new schema.Entity('purchases', {
  address: AddressSchema,
  devices: [OrderDeviceSchema],
});

export const DevicesSchema = [DeviceSchema];
export const CategoriesSchema = [CategorySchema];
export const CommentsSchema = [CommentSchema];
export const PurchasesSchema = [PurchaseSchema];
