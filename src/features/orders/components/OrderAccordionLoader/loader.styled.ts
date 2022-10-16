import styled from 'styled-components';
import { Body, Cell, OrdersAccordionHeader, Row, Wrapper } from '../../styles/ordersAccordion.styled';

export const CustomBody = styled(Body)`
  margin-bottom: 15px;
`;

export const CustomRow = styled(Row)`
  grid-auto-rows: 54px;
`;

export const CustomWrapper = styled(Wrapper)`
  margin-bottom: 15px;
  padding-top: 20px;
`;

export const HeaderContainer = styled.div`
  width: max-content;

  @media (max-width: 1420px) {
    width: fit-content;
  }
`;

export const CustomOrdersAccordionHeader = styled(OrdersAccordionHeader)`
  background-color: #fff;
  border: 1px solid #fff;
`;

export const BodyCell = styled(Cell)`
  padding: 2px;
  width: 100%;
`;
