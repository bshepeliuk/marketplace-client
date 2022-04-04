import React from 'react';
import { IDeviceInfo } from '@features/devices/types';
import { AccordingHeader, ArrowIcon } from '../../styles/filters.styled';
import AccordionInfoListView from './AccordionInfoListView';

interface IProps {
  title: string;
  info: IDeviceInfo[];
}

function AccordionItemView({ title, info }: IProps) {
  const [isItVisible, setVisible] = React.useState<boolean>(true);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <li key={title}>
      <AccordingHeader data-info="accordion-header" onClick={toggleVisibility}>
        <ArrowIcon isItVisible={isItVisible} />
        <div>{title}</div>
      </AccordingHeader>

      {isItVisible && <AccordionInfoListView info={info} />}
    </li>
  );
}

export default AccordionItemView;
