import {
  SlideDirection,
  SliderDirectionValues,
} from '@src/common/hooks/useSlider';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from 'react-icons/ai';
import styled, { css, keyframes } from 'styled-components';

export const DotImage = styled.img`
  height: 60px;
  border: 1px solid #ecf0f1;
  padding: 5px;
  border-radius: 4px;
  user-select: none;
  cursor: pointer;
`;

export const DotsList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  overflow-y: auto;
`;

export const SliderWrap = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / -1;

  @media (max-width: 968px) {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
  }
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

export const ImageWrapper = styled.div`
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
