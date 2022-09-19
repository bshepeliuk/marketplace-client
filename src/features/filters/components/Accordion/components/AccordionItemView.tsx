import React, { useState, useEffect, useRef } from 'react';
import { IDeviceInfo } from '@features/devices/types';
import { AccordingHeader, ArrowIcon } from '../../../styles/filters.styled';
import AccordionInfoListView from './AccordionInfoListView';
import useFilterContext from '../../../hooks/useFilterContext';

interface IProps {
  title: string;
  info: IDeviceInfo[];
}

function AccordionItemView({ title, info }: IProps) {
  const { setIsShownApplyBtn, hasSelectedItems } = useFilterContext();

  const bodyRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const prevHeight = useRef<number | undefined>();

  useEffect(() => {
    prevHeight.current = bodyRef.current?.getBoundingClientRect().height;
  }, []);

  useEffect(() => {
    if (isOpen) {
      const nextHeight = prevHeight.current || bodyRef.current?.getBoundingClientRect().height;

      setHeight(nextHeight);
    } else {
      setHeight(0);
    }

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

      <AccordionInfoListView height={height} bodyRef={bodyRef} info={info} />
    </li>
  );
}

export default AccordionItemView;
