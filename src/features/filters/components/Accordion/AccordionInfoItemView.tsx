import React, { ChangeEvent } from 'react';
import { IDeviceInfo } from '@src/features/devices/types';
import { AccordionInfo, CheckBox } from '../../styles/filters.styled';
import useFilterContext from '../../hooks/useFilterContext';

interface IProps {
  item: IDeviceInfo;
}

function AccordionInfoItemView({ item }: IProps) {
  const context = useFilterContext();
  // prettier-ignore
  // eslint-disable-next-line max-len
  const { setBtnVerticalOffset, onSelectOption, setShowApplyBtn, selected } = context;
  const { id, description, title } = item;

  const handleChange = (evt: ChangeEvent) => {
    const target = evt.target as HTMLElement;

    setBtnVerticalOffset(target.offsetTop);
    onSelectOption({ id, title, description });
    setShowApplyBtn(true);
  };

  const hasChecked = (optionId: number) => {
    return selected.some((i) => i.id === optionId);
  };

  return (
    <AccordionInfo>
      <CheckBox
        type="checkbox"
        checked={hasChecked(item.id)}
        onChange={handleChange}
      />
      <li>{description}</li>
    </AccordionInfo>
  );
}

export default AccordionInfoItemView;
