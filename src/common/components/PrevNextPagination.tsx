import React from 'react';
import styled from 'styled-components';
import LoaderView from './Loader/Loader';

interface IProps {
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled: boolean;
  isPrevDisabled: boolean;
  isLoading?: boolean;
}

function PrevNextPagination({ onNext, onPrev, isNextDisabled, isPrevDisabled, isLoading = false }: IProps) {
  return (
    <Wrapper>
      <Button type="button" onClick={onPrev} disabled={isPrevDisabled}>
        Previous
      </Button>
      <Button type="button" onClick={onNext} disabled={isNextDisabled}>
        {isLoading ? <LoaderView size={12} color="#3498db" strokeWidth={2} /> : 'Next'}
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 2px;
`;

const Button = styled.button`
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40px;
  font-family: 'Roboto';
  font-weight: bold;
  border: none;
  padding: 10px;
  border-radius: 4px;
  color: rgb(64, 68, 82);
  font-weight: 500;
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px,
    rgb(64 68 82 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px,
    rgb(64 68 82 / 8%) 0px 2px 5px 0px;

  &:disabled {
    opacity: 0.3;
  }
`;

export default PrevNextPagination;
