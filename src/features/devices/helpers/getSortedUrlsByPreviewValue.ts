import { IDeviceImage } from '../types';

const getSortedUrlsByPreviewValue = (images: IDeviceImage[]) => {
  return [...images].sort((prev, next) => Number(next.preview) - Number(prev.preview)).map((img) => img.url);
};

export default getSortedUrlsByPreviewValue;
