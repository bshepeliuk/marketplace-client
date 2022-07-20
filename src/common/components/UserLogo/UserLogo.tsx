import React from 'react';
import styled from 'styled-components';

const LogoWrap = styled.div<{ size: number }>`
  width: ${(props) => (props.size ? `${props.size}px` : '50px')};
  height: ${(props) => (props.size ? `${props.size}px` : '50px')};
  background-color: #ecf3f9;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #34495e;
  font-weight: bold;
  font-size: 1em;
`;

interface IProps {
  fullName: string;
  size: number;
}

function UserLogo({ fullName, size }: IProps) {
  return <LogoWrap size={size}>{fullName[0]}</LogoWrap>;
}

export default UserLogo;
