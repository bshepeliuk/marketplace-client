import styled from 'styled-components';

export const StarWrap = styled.div`
  position: relative;
`;

export const BackStar = styled.div<{ widthInPercent: number }>`
  color: #f97988;
  overflow: hidden;
  width: ${(props) => `${props.widthInPercent}%`};
  position: absolute;
  top: 0;
  z-index: 1;
`;

export const FrontStar = styled.div<{ marked: boolean }>`
  position: relative;
  top: 0;
  z-index: 2;
  color: ${(props) => (props.marked ? '#f97988' : '#c8d6e5')};
`;

export const Wrap = styled.div<{ size: number }>`
  cursor: pointer;
  display: inline-flex;
  font-size: ${(props) => `${props.size}px`};
`;
