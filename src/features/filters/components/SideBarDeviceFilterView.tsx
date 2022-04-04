import React, { MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { SideBar } from '../styles/filters.styled';
import FilterAccordionView from './Accordion/AccordionView';
import PriceFilterView from './PriceFilterView';

const Button = styled.button<{ btnOffset: number }>`
  margin-top: -5px;
  border-radius: 0 4px 4px 0;
  background-color: #fff;
  box-shadow: 0 8px 25px rgb(48 48 48 / 20%);
  padding: 4px 21px;
  color: #5285cc;
  border: 1px solid currentColor;
  position: absolute;
  right: 5px;
  top: ${({ btnOffset }) => {
    return css`
      ${btnOffset}px
    `;
  }};

  display: ${({ btnOffset }) => {
    return btnOffset > 0 ? 'block' : 'none';
  }};
`;

function SideBarDeviceFilterView() {
  const [btnOffset, setBtnOffset] = React.useState<number>(0);

  const handleClick = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;

    if (target.dataset.info === 'accordion-header') {
      // TODO: refactoring; hide button
      setBtnOffset(0);
      return;
    }

    setBtnOffset(target.offsetTop);
  };

  const handleApply = (evt: MouseEvent) => {
    evt.stopPropagation();
    // TODO: refactoring; hide button
    setBtnOffset(0);
  };

  return (
    <SideBar onClick={handleClick}>
      <Button type="button" btnOffset={btnOffset} onClick={handleApply}>
        apply
      </Button>

      <PriceFilterView />
      <FilterAccordionView />
    </SideBar>
  );
}

export default SideBarDeviceFilterView;
