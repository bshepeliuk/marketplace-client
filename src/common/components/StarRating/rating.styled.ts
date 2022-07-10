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
  z-index: 2;
  pointer-events: none;
  transition: all 0.2s ease-in-out;
`;

export const FrontStar = styled.div<{ marked: boolean }>`
  transition: all 0.2s ease-in-out;
  pointer-events: none;
  position: relative;
  top: 0;
  z-index: 2;
  color: ${(props) => (props.marked ? '#f97988' : '#c8d6e5')};
`;

export const Wrap = styled.div<{ size: number; isInteractive: boolean }>`
  cursor: pointer;
  display: inline-flex;
  font-size: ${(props) => `${props.size}px`};
  pointer-events: ${(props) => (props.isInteractive ? 'auto' : 'none')};
  line-height: 0;
`;
