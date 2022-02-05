import styled from 'styled-components';

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const ImageWrapper = styled.div`
  width: 500px;
  height: 300px;
  grid-column: 1 / 2;
`;

export const InnerWrap = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
`;

export const PurchaseButton = styled.button`
  background-color: #e31837;
  height: 48px;
  width: 250px;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
`;
