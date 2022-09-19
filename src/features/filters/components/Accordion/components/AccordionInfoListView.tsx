import React, { RefObject } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import AccordionInfoItemView from './AccordionInfoItemView';
import { List } from '../../../styles/accordion.styled';

interface IProps {
  info: IDeviceInfo[];
  height: number | undefined;
  bodyRef: RefObject<HTMLUListElement>;
}

function AccordionInfoListView({ info, bodyRef, height }: IProps) {
  return (
    <List ref={bodyRef} style={{ height }}>
      {info.map((item) => (
        <AccordionInfoItemView key={item.id} item={item} />
      ))}
    </List>
  );
}

export default AccordionInfoListView;
