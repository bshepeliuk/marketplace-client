import { schema } from 'normalizr';

export const CategorySchema = new schema.Entity('categories', {});
export const DeviceImagesSchema = new schema.Entity('images', {});

export const DeviceInfoSchema = new schema.Entity('info', {});
export const DeviceSchema = new schema.Entity('devices', {
  images: [DeviceImagesSchema],
  info: [DeviceInfoSchema],
});

export const DevicesSchema = [DeviceSchema];
export const CategoriesSchema = [CategorySchema];
