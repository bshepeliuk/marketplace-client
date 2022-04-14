import React, { useState, useEffect } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import { AccordingHeader, ArrowIcon } from '../../styles/filters.styled';
import AccordionInfoListView from './AccordionInfoListView';
import { useFilterContext } from '../../context/FilterContext';

interface IProps {
  title: string;
  info: IDeviceInfo[];
}

function AccordionItemView({ title, info }: IProps) {
  const [isVisible, setVisible] = useState<boolean>(true);
  const { setShowApplyBtn, hasSelectedItems } = useFilterContext();

  useEffect(() => {
    if (!hasSelectedItems) return;

    if (isVisible) {
      setShowApplyBtn(true);
    } else {
      setShowApplyBtn(false);
    }
  }, [isVisible]);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <li key={title}>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isVisible} />
        <div>{title}</div>
      </AccordingHeader>

      {isVisible && <AccordionInfoListView info={info} />}
    </li>
  );
}

export default AccordionItemView;
