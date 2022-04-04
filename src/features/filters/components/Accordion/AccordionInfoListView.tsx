import React, { useState } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import AccordionInfoItemView from './AccordionInfoItemView';

interface IProps {
  info: IDeviceInfo[];
}

type ISelectProps = Partial<IDeviceInfo>;

function AccordionInfoListView({ info }: IProps) {
  const [selected, setSelected] = useState<ISelectProps[]>([]);

  const onSelect = (infoItem: ISelectProps) => {
    // TODO: refactoring;
    const filteredItems = selected.filter((i) => i.id === infoItem.id);
    const hasAdded = filteredItems.length > 0;

    if (hasAdded) {
      // TODO: refactoring
      setSelected(selected.filter((i) => i.id !== infoItem.id));
    } else {
      setSelected((prev) => [...prev, infoItem]);
    }
  };

  return (
    <ul>
      {info.map((item) => (
        <AccordionInfoItemView key={item.id} item={item} onSelect={onSelect} />
      ))}
    </ul>
  );
}

export default AccordionInfoListView;
