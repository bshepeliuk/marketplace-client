import styled from 'styled-components';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
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

export const InnerWrap = styled.div`
  display: grid;
  grid-template-columns: 60px 440px 1fr 100px;
  margin: 20px 0;
  grid-template-rows: 50px 50px 50px 1fr;
  row-gap: 15px;

  @media (max-width: 1060px) {
    grid-template-columns: 60px 350px 1fr 100px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 60px 1fr 1fr 100px;
    grid-template-rows: 50px 50px 400px 50px 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 60px 1fr 1fr 100px;
    grid-template-rows: 50px 50px 1fr 50px;
  }
`;

export const InfoWrap = styled.div`
  grid-column: 3 / 4;
  grid-row: 4 / 5;

  @media (max-width: 968px) {
    grid-column: 1 / -1;
    grid-row: 5;
    justify-self: center;
  }
`;

export const NavWrap = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / 3;
  background-color: #f5f5f5;
  border-radius: 4px;
  align-self: center;
  padding: 10px 40px;
  display: flex;
`;

export const CommentsWrap = styled.div`
  grid-column: 1 / -1;
  height: max-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  background-color: #f5f5f5;
  gap: 1px;
}

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

export const MenuLink = styled(NavLink)`
  margin-right: 15px;
  text-decoration: none;
  position: relative;
  user-select: none;
  color: #3498db;

  &::after {
    position: absolute;
    bottom: -10px;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #1abc9c;
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.25s ease-out;
  }

  &.active {
    color: #1abc9c;

    &::after {
      transition-delay: 0.25s;
      transform: scaleX(1);
    }
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const CurrentRating = styled.div`
  grid-column: 4;
  grid-row: 1;
  justify-self: center;
  align-self: center;

  display: flex;
  align-items: center;
`;

export const RatingValue = styled.div`
  color: #95afc0;
  font-weight: bold;
`;

export const PurchaseWrap = styled.div`
  grid-column: 3;
  grid-row: 3 / 4;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: max-content;

  @media (max-width: 968px) {
    grid-row: 4;
    grid-column: 1 / -1;
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
  cursor: pointer;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  grid-column: 2;
  grid-row: 1;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: #f97988;
  }

  &:disabled {
    background-color: #bdc3c7;
  }

  @media (max-width: 600px) {
    width: 150px;
  }
`;

export const Title = styled.h1`
  grid-column: 2;
  align-self: center;
  color: #34495e;
  grid-row: 1;
  justify-self: start;

  @media (max-width: 650px) {
    font-size: 25px;
  }

  @media (max-width: 550px) {
    font-size: 18px;
  }

  @media (max-width: 430px) {
    grid-column: 2 / 4;
  }
`;

export const BackBtn = styled(MdOutlineArrowBackIos)`
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  font-size: 20px;
  cursor: pointer;
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

  @media (max-width: 968px) {
    margin: 40px 0 0 0;
  }
`;

export const InfoItem = styled.li`
  display: grid;
  grid-template-columns: 170px 1fr;
  justify-items: self-start;
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

export const CommentFormContainer = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 20px 20px 15px 40px;
  display: flex;
  flex-flow: column;
  gap: 20px;

  @media (max-width: 968px) {
    grid-row: 1;
  }
`;

export const RatingMessage = styled.p`
  margin: 0;
  font-size: 10px;
  color: #1abc9c;
  font-family: 'Roboto';
`;

export const RatingAmount = styled.span`
  margin-left: 5px;
  color: #95afc0;
`;

export const FormItem = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  max-width: 400px;
`;

export const RatingTitleWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const FormTitle = styled.h1`
  text-transform: uppercase;
  font-size: 15px;
  font-family: 'Roboto';
  letter-spacing: 1px;
  color: #4b6587;
`;
