import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { MdUpload } from 'react-icons/md';

export const Wrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
  flex-flow: column wrap;
  align-items: center;
`;

export const FormWrap = styled.div`
  width: 400px;
`;

export const ImageFormWrap = styled(FormWrap)`
  width: 400px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
`;

export const FormFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 30px;
  width: 400px;
`;

export const FeatureFormFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 30px;
`;

export const NextLink = styled(Link)`
  grid-column: 2;
  justify-self: end;
  user-select: none;
`;

export const NextButton = styled.button`
  grid-column: 2;
  justify-self: end;
  user-select: none;
  border: none;
  color: #01a3a4;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 0.8em;
  font-weight: bold;
  border: 1px solid #01a3a4;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 40px;

  &:disabled {
    color: #bdc3c7;
    border: 1px solid #bdc3c7;
  }
`;

export const FeatureNextBtn = styled(NextButton)`
  grid-column: 3;
`;

export const AddButton = styled.button`
  background-color: #10ac84;
  border: none;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8em;

  &:disabled {
    border: 1px solid #c8d6e5;
    border-radius: 4px;
    color: #c8d6e5;
    background-color: #fff;
  }
`;

export const PrevLink = styled(Link)`
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
  width: 70px;
  user-select: none;
  text-align: center;
  height: 40px;
  border: 1px solid #01a3a4;
  color: #01a3a4;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
`;

export const SaveButton = styled.button`
  grid-column: 2;
  justify-self: end;
  background-color: #10ac84;
  border: none;
  border-radius: 4px;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8em;
  width: 70px;
  height: 40px;
  user-select: none;

  &:disabled {
    border: 1px solid #c8d6e5;
    border-radius: 4px;
    color: #c8d6e5;
    background-color: #fff;
  }
`;

export const PreviewImage = styled.img`
  height: 150px;
`;

export const PreviewList = styled.ul`
  padding: 20px 15px;
  margin: 0;
  display: flex;
  overflow: hidden;
  width: 400px;
`;

export const PreviewListItem = styled.li`
  border: 1px solid rgba(149, 165, 166, 0.3);
  border-radius: 4px;
  padding: 2px 6px;
  margin-right: 15px;
  transition: transform 0.3s;
  user-select: none;

  &:hover {
    transform: scale(1.1);
  }

  &:last-child {
    margin-right: 0px;
  }
`;

export const LeftArrow = styled(AiFillLeftCircle)`
  position: absolute;
  left: -40px;
  font-size: 35px;
  top: 50%;
  transform: translateY(-50%);
`;

export const RightArrow = styled(AiFillRightCircle)`
  position: absolute;
  right: -40px;
  font-size: 35px;
  top: 50%;
  transform: translateY(-50%);
`;

export const RightArrowWrap = styled.div`
  &:before {
    content: '';
    background: linear-gradient(to left, #fff 20%, rgba(255, 255, 255, 0) 80%);
    height: 100%;
    width: 32px;
    display: block;
    position: absolute;
    right: 0;
    z-index: 100;
    top: 0;
  }
`;

export const LeftArrowWrap = styled.div`
  &:after {
    z-index: 100;
    content: '';
    background: linear-gradient(to right, #fff 10%, rgba(249, 249, 249, 0) 90%);
    height: 100%;
    width: 32px;
    position: absolute;
    display: block;
    left: 0;
    top: 0;
  }
`;

export const DeleteImgButton = styled.button`
  background-color: transparent;
  border: none;
  color: #3498db;
  text-decoration: underline;
`;

export const FileInputLabel = styled.label<{ isDisabled: boolean }>`
  background-color: ${({ isDisabled }) => (isDisabled ? '#bdc3c7' : '#34495e')};
  color: white;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  user-select: none;
  width: 100%;
`;

export const UploadIcon = styled(MdUpload)`
  font-size: 30px;
`;
