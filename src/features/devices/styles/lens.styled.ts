import styled from 'styled-components';

export const Wrap = styled.div`
  position: relative;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

export const Lens = styled.div`
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  border-radius: 4px;
  background-color: rgba(26, 188, 156, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  pointer-events: none;
  z-index: 1;

  @media (max-width: 968px) {
    display: none;
  }
`;

export const LensOutput = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  width: 400px;
  height: 100%;
  grid-column: 3;
  grid-row: 3 / 5;
  z-index: 20;
  justify-self: center;
  border-radius: 4px;

  @media (max-width: 968px) {
    display: none;
  }
`;
