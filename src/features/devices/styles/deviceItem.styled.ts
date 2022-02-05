import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 20px;
`;

export const ListItem = styled.li`
  list-style-type: none;
  border: 1px solid rgba(189, 195, 199, 0.4);
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const ImageWrapper = styled.div`
  height: 270px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(236, 240, 241, 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #34495e;
`;
