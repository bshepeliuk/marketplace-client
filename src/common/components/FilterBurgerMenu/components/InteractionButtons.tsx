import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useFilterContext from '@src/features/filters/hooks/useFilterContext';
import { ApplyButton, ClearButton, InteractionWrap } from '../filterBurgerMenu.styled';

interface IProps {
  onClose: () => void;
}

function InteractionButtons({ onClose }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { clearSelectedOptions, apply } = useFilterContext();

  const onClear = () => {
    const categoryId = searchParams.get('categoryId');

    if (categoryId) {
      setSearchParams([['categoryId', categoryId]]);
    }

    clearSelectedOptions();
    onClose();
  };

  const onApply = () => {
    apply();
    onClose();
  };

  return (
    <InteractionWrap>
      <ClearButton type="button" onClick={onClear}>
        clear
      </ClearButton>
      <ApplyButton type="button" onClick={onApply}>
        apply
      </ApplyButton>
    </InteractionWrap>
  );
}

export default InteractionButtons;
