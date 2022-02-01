import React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { IDevice } from './types';

interface IItemProps {
  index: number;
  data: IDevice[];
  style: CSSProperties;
}

const Title = styled.h1`
  font-size: 20px;
`;

const ListItem = styled.li`
  list-style-type: none;
`;

function DeviceItemView({ index, data, style }: IItemProps) {
  const device = data[index];

  return (
    <ListItem key={device.id} style={style}>
      <Title>{device.name}</Title>
    </ListItem>
  );
}

export default DeviceItemView;
