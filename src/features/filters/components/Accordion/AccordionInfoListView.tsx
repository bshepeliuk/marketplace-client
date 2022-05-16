import React, { useRef } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import useGetElementSizeByRef from '@common/hooks/useGetElementSizeByRef';
import AccordionInfoItemView from './AccordionInfoItemView';
import { List } from '../../styles/accordion.styled';
import { InfoStatusUnion } from '../../types';

interface IProps {
  info: IDeviceInfo[];
  infoStatus: InfoStatusUnion | null;
}

function AccordionInfoListView({ info, infoStatus }: IProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const size = useGetElementSizeByRef(listRef);

  return (
    <List ref={listRef} height={size.height} infoStatus={infoStatus}>
      {info.map((item) => (
        <AccordionInfoItemView key={item.id} item={item} />
      ))}
    </List>
  );
}

export default AccordionInfoListView;
