import styled from 'styled-components';

export const Wrap = styled.div`
  height: 50px;
  margin-top: -60px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const List = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  list-style-type: none;
  padding: 0 10px;
  align-items: center;
  margin: 0;
  height: 100%;
  overflow: hidden;
`;

export const ListItem = styled.li`
  margin-right: 10px;
  user-select: none;
`;

export const CategoryButton = styled.button<{ isActive: boolean }>`
  font-size: 10px;
  line-height: 16px;
  white-space: nowrap;
  color: #303030;
  background: #fff;
  border-radius: 4px;
  padding: 7px 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease-out;

  border: ${({ isActive }) => {
    return isActive ? '1px solid #e31837' : '1px solid #e0e0e0';
  }};

  color: ${({ isActive }) => {
    return isActive ? '#e31837' : '#303030';
  }};

  &:hover {
    color: #e31837;
    box-shadow: 0 0 5px rgb(0 0 5 / 20%);
  }
`;

const ScrollArrowButton = styled.button`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  position: relative;

  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.4);
  }
`;

export const LeftArrowButton = styled(ScrollArrowButton)<{
  isLeftVisible: boolean;
}>`
  display: ${({ isLeftVisible }) => {
    return isLeftVisible ? 'flex' : 'none';
  }};

  &::after {
    content: '';
    background: linear-gradient(to right, #fff 10%, rgba(249, 249, 249, 0) 90%);
    height: 32px;
    width: 32px;
    position: absolute;
    display: block;
    left: 25px;
  }
`;
export const RightArrowButton = styled(ScrollArrowButton)<{
  isRightVisible: boolean;
}>`
  display: ${({ isRightVisible }) => {
    return isRightVisible ? 'flex' : 'none';
  }};

  &::before {
    content: '';
    background: linear-gradient(to left, #fff 20%, rgba(255, 255, 255, 0) 80%);
    height: 32px;
    width: 32px;
    display: block;
    position: absolute;
    right: 25px;
  }
`;
