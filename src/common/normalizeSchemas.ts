import { schema } from 'normalizr';

export const DeviceSchema = new schema.Entity('devices', {});
export const CategorySchema = new schema.Entity('categories', {});

export const DevicesSchema = [DeviceSchema];
export const CategoriesSchema = [CategorySchema];
