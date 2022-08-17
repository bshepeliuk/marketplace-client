import {
  SlideDirection,
  SliderDirectionValues,
} from '@src/common/hooks/useSlider';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import styled, { css, keyframes } from 'styled-components';

export const DotImage = styled.img`
  height: 90px;
  border: 1px solid #ecf0f1;
  padding: 5px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
  margin-right: 9px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    border: 1px solid #1abc9c;
    transition: all 0.5s ease-out;
  }
`;

export const DotsList = styled.ul`
  display: flex;
  margin-top: 10px;
  overflow-y: auto;
  padding-bottom: 10px;
`;

export const SliderWrap = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / -1;

  @media (max-width: 968px) {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
  }
`;

export const DevicePlaceholder = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / -1;
  height: 350px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #bdc3c7;
  display: flex;
`;

export const LeftArrow = styled(AiOutlineLeftCircle)`
  position: absolute;
  left: 4px;
  font-size: 40px;
  color: #95a5a6;
  transition: all 0.5s ease-out;
  z-index: 10;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    color: #1abc9c;
  }
`;
export const RightArrow = styled(AiOutlineRightCircle)`
  position: absolute;
  right: 4px;
  font-size: 40px;
  color: #95a5a6;
  transition: all 0.5s ease-out;
  z-index: 10;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    color: #1abc9c;
  }
`;

export const slideLeft = keyframes`
  0% {
    transform: translateX(0) scale(1);
  }

  50% {
    transform: scale(0.5)
  }

  100% {
    transform: translateX(500px) scale(0.2);
  }
`;

export const slideRight = keyframes`
  0% {
    transform: translateX(0) scale(1);
  }

  50% {
    transform: scale(0.5)
  }

  100% {
    transform: translateX(-500px) scale(0.2);
  }
`;

export const InnerWrapper = styled.div`
  justify-self: center;
  border: 1px solid #ecf0f1;
  padding: 10px 45px;
  border-radius: 4px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const SliderImage = styled.img<{
  slideDirection: SliderDirectionValues;
}>`
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  transition: all 1s ease-out;

  animation: ${({ slideDirection }) => {
    if (slideDirection === SlideDirection.Left) {
      return css`0.6s ${slideLeft} ease-in backwards`;
    }

    if (slideDirection === SlideDirection.Right) {
      return css`0.6s ${slideRight} ease-in backwards`;
    }
  }};
`;
