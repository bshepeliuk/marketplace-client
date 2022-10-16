import React, { useState, useEffect } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import useDynamicHeightBasedOnVisibility from '@common/hooks/useDynamicHeightBasedOnVisibility';
import { AccordingHeader, ArrowIcon } from '../../../styles/filters.styled';
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

  useEffect(() => {
    if (isOpen && hasSelectedItems) {
      setIsShownApplyBtn(true);
    } else {
      setIsShownApplyBtn(false);
    }
  }, [isOpen]);

  const toggleVisibility = () => setIsOpen(!isOpen);

  return (
    <li key={title}>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isOpen} />
        <div>{title}</div>
      </AccordingHeader>

      <AccordionInfoListView height={height} bodyRef={wrapperRef} info={info} />
    </li>
  );
}

export default AccordionItemView;
