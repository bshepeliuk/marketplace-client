import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IDeviceInfo } from '@features/devices/types';
import AccordionInfoItemView from './AccordionInfoItemView';

interface IProps {
  info: IDeviceInfo[];
  isVisible: boolean;
}

const show = (height: number | null, isVisible: boolean) => {
  if (isVisible) {
    return keyframes`
        0% {
          height: 0;
        }

        100% {
          height: ${height}px;
      }
    `;
  }

  return keyframes`
    0% {
      height: ${height}px;
    }

    100% {
      height: 0;
    }
  `;
};
const List = styled.ul<{ isVisible: boolean; height: number | null }>`
  transition: all 0.2s ease-out;

  overflow: hidden;
  height: ${(props) => {
    return props.isVisible ? '100%' : `0px`;
  }};

  animation: 0.3s ${(props) => show(props.height, props.isVisible)} ease-in-out
    backwards;
`;

function AccordionInfoListView({ info, isVisible }: IProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (!listRef.current) return;

    setHeight(listRef.current.clientHeight);
  }, []);

  return (
    <List ref={listRef} isVisible={isVisible} height={height}>
      {info.map((item) => (
        <AccordionInfoItemView key={item.id} item={item} />
      ))}
    </List>
  );
}

export default AccordionInfoListView;
