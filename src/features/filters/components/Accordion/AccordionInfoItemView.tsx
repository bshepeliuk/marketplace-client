import React, { useRef } from 'react';
import { IDeviceInfo } from '@src/features/devices/types';
import { AccordionInfo, CheckBox, Label } from '../../styles/filters.styled';
import useFilterContext from '../../hooks/useFilterContext';

interface IProps {
  item: IDeviceInfo;
}

function AccordionInfoItemView({ item }: IProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const context = useFilterContext();
  // prettier-ignore
  // eslint-disable-next-line max-len
  const { setBtnOffsetY, onSelectOption, setShowApplyBtn, selected } = context;
  const { id, description, title } = item;

  const handleChange = () => {
    setBtnOffsetY(wrapRef.current!.offsetTop);
    onSelectOption({ id, title, description });
    setShowApplyBtn(true);
  };

  const hasChecked = (optionId: number) => {
    return selected.some((i) => i.id === optionId);
  };

  return (
    <AccordionInfo ref={wrapRef}>
      <Label htmlFor={item.description}>
        <CheckBox
          id={item.description}
          type="checkbox"
          checked={hasChecked(item.id)}
          onChange={handleChange}
        />
        <span className="checkmark" />
      </Label>

      <li>{description}</li>
    </AccordionInfo>
  );
}

export default AccordionInfoItemView;
