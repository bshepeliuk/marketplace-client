import styled, { css } from 'styled-components';
import {
  InfoStatus,
  InfoStatusUnion,
} from '../components/Accordion/AccordionItemView';
import { hideByHeight, showByHeight } from './filterAnimation.styled';

export const List = styled.ul<{
  height: number | null;
  infoStatus: InfoStatusUnion | null;
}>`
  transition: all 0.2s ease-out;

  overflow: hidden;
  height: ${({ infoStatus }) => {
    const isVisible = infoStatus === InfoStatus.show || infoStatus === null;
    return isVisible ? '100%' : '0px';
  }};

  animation: ${({ height, infoStatus }) => {
    if (infoStatus === InfoStatus.show) {
      return css`0.3s ${showByHeight(height)} ease-in-out backwards`;
    }

    if (infoStatus === InfoStatus.hide) {
      return css`0.3s ${hideByHeight(height)} ease-in-out backwards`;
    }
  }};
`;
