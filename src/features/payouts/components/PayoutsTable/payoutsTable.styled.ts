import styled from 'styled-components';

export const Status = styled.span`
  background-color: #d7f7c2;
  color: rgba(0, 105, 8, 1);
  padding: 3px 8px;
  border-radius: 4px;
`;

export const Amount = styled.span`
  font-weight: 500;
`;

export const Currency = styled.span`
  color: #687385;
`;

export const Table = styled.div`
  overflow: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(236, 240, 241, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(52, 73, 94, 0.1);
  }
`;
export const Cell = styled.div`
  padding: 10px 8px;
  font-family: 'Roboto';
  font-weight: 300;
`;
export const EmptyCell = styled.div``;

export const Row = styled.div`
  display: grid;
  grid-template-columns: minmax(100px, auto) 50px repeat(3, minmax(150px, 1fr));
  border-bottom: 1px solid rgba(236, 240, 241, 1);
  column-gap: 10px;

  &:hover {
    background-color: rgba(236, 240, 241, 0.5);
  }
`;

export const HeaderRow = styled(Row)`
  text-transform: uppercase;
  border-top: 1px solid rgba(236, 240, 241, 1);
  border-bottom: 1px solid rgba(236, 240, 241, 1);
  font-size: 12px;
  font-weight: bold;
  color: #212121;

  &:hover {
    background-color: #fff;
  }
`;
