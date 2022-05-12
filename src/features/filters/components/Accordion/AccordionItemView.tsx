import React, { useState, useEffect } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import { AccordingHeader, ArrowIcon } from '../../styles/filters.styled';
import AccordionInfoListView from './AccordionInfoListView';
import useFilterContext from '../../hooks/useFilterContext';
import { InfoStatus, InfoStatusUnion } from '../../types';

interface IProps {
  title: string;
  info: IDeviceInfo[];
}

function AccordionItemView({ title, info }: IProps) {
  const [infoStatus, setInfoStatus] = useState<InfoStatusUnion | null>(null);
  const { setShowApplyBtn, hasSelectedItems } = useFilterContext();

  const isVisible = infoStatus === InfoStatus.show;

  useEffect(() => {
    if (!hasSelectedItems) return;

    if (isVisible) {
      setShowApplyBtn(true);
    } else {
      setShowApplyBtn(false);
    }
  }, [isVisible]);

  const toggleVisibility = () => {
    if (infoStatus === InfoStatus.hide) {
      setInfoStatus(InfoStatus.show);
      return;
    }

    setInfoStatus(InfoStatus.hide);
  };

  return (
    <li key={title}>
      <AccordingHeader onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isVisible} />
        <div>{title}</div>
      </AccordingHeader>

      <AccordionInfoListView info={info} infoStatus={infoStatus} />
    </li>
  );
}

export default AccordionItemView;
