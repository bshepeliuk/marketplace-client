import React, { useState } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import useDynamicHeightBasedOnVisibility from '@common/hooks/useDynamicHeightBasedOnVisibility';
import { AccordingHeader, ArrowIcon, Title } from '../../../styles/filters.styled';
import AccordionInfoListView from './AccordionInfoListView';
import useFilterContext from '../../../hooks/useFilterContext';

interface IProps {
  title: string;
  info: IDeviceInfo[];
}

function AccordionItemView({ title, info }: IProps) {
  const { setIsShownApplyBtn, hasSelectedItems } = useFilterContext();
  const [isOpen, setIsOpen] = useState(true);
  const { height, wrapperRef } = useDynamicHeightBasedOnVisibility<HTMLUListElement>(isOpen);

  const toggleVisibility = () => {
    setIsOpen(!isOpen);

    if (!isOpen && hasSelectedItems) {
      setIsShownApplyBtn(true);
    } else {
      setIsShownApplyBtn(false);
    }
  };

  return (
    <li key={title}>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isOpen} />
        <Title>{title}</Title>
      </AccordingHeader>

      <AccordionInfoListView height={height} bodyRef={wrapperRef} info={info} />
    </li>
  );
}

export default AccordionItemView;
