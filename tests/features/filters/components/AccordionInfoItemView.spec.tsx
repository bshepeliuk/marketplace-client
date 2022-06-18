/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable max-len */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { FilterContext } from '@features/filters/context/FilterContext';
import AccordionInfoItemView from '@features/filters/components/Accordion/AccordionInfoItemView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { filterContextValuesMock } from '../../../mocks/data';

const info = {
  id: 2,
  typeId: 1,
  title: 'Microprocessor',
  description: 'AMD Ryzen 9',
  deviceId: 1,
  createdAt: '2022-03-27T13:14:13.793Z',
  updatedAt: '2022-03-27T13:14:13.793Z',
};

describe('[COMPONENTS]: AccordionInfoItemView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const setBtnOffsetY = jest.fn();
  const onSelectOption = jest.fn();
  const setIsShownApplyBtn = jest.fn();

  test('should be checked in case item added to selected.', () => {
    const { getByTestId } = setupAndRenderComponent({
      state: {},
      component: () => (
        <FilterContext.Provider
          value={{
            ...filterContextValuesMock,
            setBtnOffsetY,
            onSelectOption,
            setIsShownApplyBtn,
            selected: [info],
          }}
        >
          <AccordionInfoItemView item={info} />
        </FilterContext.Provider>
      ),
    });

    const InfoItemCheckBox = getByTestId(info.description) as HTMLInputElement;

    expect(InfoItemCheckBox).toBeInTheDocument();
    expect(InfoItemCheckBox.checked).toBeTruthy();
  });

  test('should be unchecked in case item have not added to selected.', () => {
    const { getByTestId } = setupAndRenderComponent({
      state: {},
      component: () => (
        <FilterContext.Provider
          value={{
            ...filterContextValuesMock,
            setBtnOffsetY,
            onSelectOption,
            setIsShownApplyBtn,
            selected: [],
          }}
        >
          <AccordionInfoItemView item={info} />
        </FilterContext.Provider>
      ),
    });

    const InfoItemCheckBox = getByTestId(info.description) as HTMLInputElement;

    expect(InfoItemCheckBox).toBeInTheDocument();
    expect(InfoItemCheckBox.checked).toBeFalsy();
  });

  test('should add checked item to selected.', () => {
    const { getByTestId } = setupAndRenderComponent({
      state: {},
      component: () => (
        <FilterContext.Provider
          value={{
            ...filterContextValuesMock,
            setBtnOffsetY,
            onSelectOption,
            setIsShownApplyBtn,
          }}
        >
          <AccordionInfoItemView item={info} />
        </FilterContext.Provider>
      ),
    });

    const InfoItemCheckBox = getByTestId(info.description) as HTMLInputElement;

    fireEvent.click(InfoItemCheckBox);

    expect(onSelectOption).toBeCalledWith({
      description: 'AMD Ryzen 9',
      id: 2,
      title: 'Microprocessor',
    });

    expect(setIsShownApplyBtn).toBeCalledWith(true);
    expect(setBtnOffsetY).toHaveBeenCalledWith(0);
  });
});
