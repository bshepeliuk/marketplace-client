import { schema } from 'normalizr';

export const DeviceSchema = new schema.Entity('devices', {});

export const DevicesSchema = [DeviceSchema];
