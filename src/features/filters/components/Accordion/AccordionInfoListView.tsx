import React from 'react';
import { IDeviceInfo } from '@features/devices/types';
import AccordionInfoItemView from './AccordionInfoItemView';

interface IProps {
  info: IDeviceInfo[];
}

function AccordionInfoListView({ info }: IProps) {
  return (
    <ul>
      {info.map((item) => (
        <AccordionInfoItemView key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default AccordionInfoListView;
