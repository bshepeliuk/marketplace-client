import styled from 'styled-components';
import { showDeviceAnimation } from './animation.styled';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 390px 1180px;
  justify-content: center;
  column-gap: 10px;
  padding: 0 10px 15px 15px;

  @media (max-width: 1600px) {
    grid-template-columns: 400px 900px;
  }

  @media (max-width: 1340px) {
    grid-template-columns: 400px 605px;
  }

  @media (max-width: 1020px) {
    grid-template-columns: 400px 320px;
  }
`;

export const FilterBurgerMenuContainer = styled.div`
  display: none;

  @media (max-width: 1050px) {
    padding: 20px 0;
    margin: 0 auto;
    max-width: 875px;
    display: block;
  }

  @media (max-width: 920px) {
    max-width: 580px;
  }

  @media (max-width: 650px) {
    max-width: 285px;
  }
`;

export const ActiveFilterContainer = styled(Container)`
  @media (max-width: 1050px) {
    display: none;
  }
`;

export const PaginationContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2;
  padding: 30px 0 20px 0;

  @media (max-width: 1050px) {
    grid-column: 1 / -1;
    grid-row: 2;
    align-self: center;
    width: max-content;
    justify-self: center;
  }
`;

export const SideBarWrap = styled.div`
  grid-column: 1 / 2;
  grid-row-start: 1;

  @media (max-width: 1050px) {
    display: none;
  }
`;

export const List = styled.ul`
  grid-column: 2 / 3;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, 285px);
  gap: 10px;
  height: max-content;
  max-width: 1200px;

  @media (max-width: 1600px) {
    max-width: 900px;
  }

  @media (max-width: 1050px) {
    grid-column: 1 / -1;
    justify-self: center;
  }

  @media (max-width: 920px) {
    max-width: 605px;
  }

  @media (max-width: 650px) {
    max-width: 320px;
  }
`;

export const LoaderListItem = styled.li`
  list-style-type: none;
  border: 1px solid rgba(189, 195, 199, 0.3);
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0px 5px 10px 2px rgba(115, 124, 131, 0.08) inset;
  animation: 0.5s ${showDeviceAnimation} ease-in-out forwards;
`;
