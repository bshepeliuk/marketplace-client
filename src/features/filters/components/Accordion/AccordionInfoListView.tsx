import React, { useEffect, useRef, useState } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import AccordionInfoItemView from './AccordionInfoItemView';
import { List } from '../../styles/accordion.styled';
import { InfoStatusUnion } from './AccordionItemView';

interface IProps {
  info: IDeviceInfo[];
  infoStatus: InfoStatusUnion | null;
}

function AccordionInfoListView({ info, infoStatus }: IProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    setHeight(listRef.current.clientHeight);
  }, []);

  return (
    <List ref={listRef} height={height} infoStatus={infoStatus}>
      {info.map((item) => (
        <AccordionInfoItemView key={item.id} item={item} />
      ))}
    </List>
  );
}

export default AccordionInfoListView;
