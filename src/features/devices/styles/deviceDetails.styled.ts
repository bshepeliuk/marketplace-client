import styled from 'styled-components';
import { MdOutlineArrowBackIos } from 'react-icons/md';

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const ImageWrapper = styled.div`
  grid-column: 1 / 3;
  justify-self: center;
  border: 1px solid #ecf0f1;
  padding: 10px;
  border-radius: 4px;
  grid-row: 3 / 5;

  @media (max-width: 968px) {
    grid-column: 1 / 4;
    grid-row: 3 / 4;
  }
`;

export const InnerWrap = styled.div`
  display: grid;
  grid-template-columns: 60px 440px 1fr;
  grid-template-rows: 50px 50px 50px 1fr;
  margin-top: -40px;
  row-gap: 15px;

  @media (max-width: 1060px) {
    grid-template-columns: 60px 350px 1fr;
  }

  @media (max-width: 968px) {
    grid-template-columns: 60px 350px 1fr;
    grid-template-rows: 50px 50px 450px 50px 1fr;
  }

  @media (max-width: 420px) {
    grid-template-columns: 60px 300px 1fr;
  }
`;

export const InfoWrap = styled.div`
  grid-column: 3 / 4;
  grid-row: 4 / 5;

  @media (max-width: 968px) {
    grid-column: 1 / 4;
    grid-row: 5;
    justify-self: center;
  }
`;

export const TabsWrap = styled.div`
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  background-color: #f5f5f5;
  border-radius: 4px;
  align-self: center;
  padding: 10px 20px;

  & .tab-link {
    margin-right: 15px;
  }
`;

export const TabsContent = styled.div`
  grid-column: 1 / -1;
`;

export const PurchaseWrap = styled.div`
  grid-column: 3;
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: max-content;

  @media (max-width: 968px) {
    grid-row: 4;
    grid-column: 1 / 4;
    justify-self: center;
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
  grid-column: 2;
  grid-row: 1;

  &:disabled {
    background-color: #bdc3c7;
  }

  @media (max-width: 600px) {
    width: 150px;
  }
`;

export const Title = styled.h1`
  grid-column: 2 / -1;
  align-self: center;
  color: #34495e;
  grid-row: 1;

  @media (max-width: 600px) {
    font-size: 25px;
  }
`;

export const BackBtn = styled(MdOutlineArrowBackIos)`
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  font-size: 20px;
`;

export const Price = styled.p`
  text-align: center;
  cursor: pointer;
  font-size: 27px;
  grid-column: 1;
  grid-row: 1;
  margin: 0;
  color: #2c3e50;
  letter-spacing: 1px;
  white-space: nowrap;
  align-self: center;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
  font-family: Roboto, sans-serif;
`;

export const InfoList = styled.ul`
  margin: 40px 0 0 30px;
`;

export const InfoItem = styled.li`
  display: grid;
  grid-template-columns: 170px 1fr;
`;

export const FeatureDescription = styled.p`
  margin: 0;
  font-weight: 600;
  color: #2c3e50;
`;

export const FeatureTitle = styled.h3`
  margin: 0;
  font-weight: 300;
`;
