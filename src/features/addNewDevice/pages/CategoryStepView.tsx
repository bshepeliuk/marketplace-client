import React from 'react';
import { FormWrap } from '../styles/deviceForm.styled';
import CategoryFormView from '../components/CategoryForm/CategoryFormView';

function CategoryStepView() {
  return (
    <FormWrap>
      <CategoryFormView />
    </FormWrap>
  );
}

export default CategoryStepView;
