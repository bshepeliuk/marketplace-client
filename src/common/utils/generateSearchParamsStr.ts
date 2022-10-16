import { IGetDevicesProps } from '../types/apiTypes';

function generateSearchParamsStr({ filters, offset, limit }: IGetDevicesProps) {
  let paramsUrl = new URLSearchParams([
    ['offset', String(offset)],
    ['limit', String(limit)],
  ]);

  if (filters) {
    paramsUrl = new URLSearchParams([...filters, ...Array.from(paramsUrl.entries())]);
  }

  return paramsUrl;
}

export default generateSearchParamsStr;
