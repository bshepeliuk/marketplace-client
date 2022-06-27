import styled from 'styled-components';

export const Circle = styled.div<{ isActive: boolean }>`
  height: 50px;
  width: 50px;
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  color: #fff;
  font-weight: bold;
  transition: all 0.6s ease-in;
  font-size: 25px;

  color: ${(props) => (props.isActive ? '#1abc9c;' : '#bdc3c7;')};

  border: ${(props) =>
    props.isActive ? '5px solid #1abc9c;' : '5px solid #bdc3c7;'};
`;

export const Wrap = styled.div`
  display: flex;
  width: 400px;
  justify-content: space-between;
  margin-bottom: 50px;
  position: relative;
`;

export const ProgressLine = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}%`};
  background-color: #1abc9c;
  position: absolute;
  height: 8px;
  z-index: 0;
  top: 50%;
  transform: translateY(-50%);
  transition: all 1s ease-out;

  &:after {
    content: '';
    display: block;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid #1abc9c;
    position: relative;
    left: 100%;
    width: 10px;
  }
`;

export const Title = styled.h4<{ isActive: boolean }>`
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  margin-top: 10px;
  color: ${(props) => (props.isActive ? '#1abc9c;' : '#bdc3c7;')};
  transition: all 0.4s ease-out;
  font-weight: normal;
  user-select: none;
`;

export const InnerWrap = styled.div`
  position: relative;
`;
