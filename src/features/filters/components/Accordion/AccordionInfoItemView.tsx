import React, { useState } from 'react';
import { IDeviceInfo } from '@src/features/devices/types';
import { AccordionInfo, CheckBox } from '../../styles/filters.styled';

type ISelectProps = Partial<IDeviceInfo>;

interface IProps {
  item: IDeviceInfo;
  // eslint-disable-next-line no-unused-vars
  onSelect: (props: ISelectProps) => void;
}

function AccordionInfoItemView({ item, onSelect }: IProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    //  TODO: evt.target.offsetTop; offset for apply filter button
    const { id, title, description } = item;

    onSelect({ id, title, description });
    setChecked((prev) => !prev);
  };

  return (
    <AccordionInfo>
      <CheckBox type="checkbox" checked={checked} onChange={handleChange} />
      <li>{item.description}</li>
    </AccordionInfo>
  );
}

export default AccordionInfoItemView;
