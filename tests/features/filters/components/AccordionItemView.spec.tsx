/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { FilterContext, FilterProvider } from '@features/filters/context/FilterContext';
import AccordionItemView from '@features/filters/components/Accordion/components/AccordionItemView';
import setupAndRenderComponent from '../../../helpers/setupAndRenderComponent';
import { filterContextValuesMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const microprocessorsInfo = [
  {
    id: 2,
    typeId: 1,
    title: 'Microprocessor',
    description: 'AMD Ryzen 9',
    deviceId: 1,
    createdAt: '2022-03-27T13:14:13.793Z',
    updatedAt: '2022-03-27T13:14:13.793Z',
  },
  {
    id: 8,
    typeId: 1,
    title: 'Microprocessor',
    description: 'AMD Ryzen 3',
    deviceId: 2,
    createdAt: '2021-03-07T01:02:24.466Z',
    updatedAt: '2021-03-07T01:02:24.466Z',
  },
  {
    id: 14,
    typeId: 1,
    title: 'Microprocessor',
    description: 'Intel Core i7',
    deviceId: 3,
    createdAt: '2022-03-30T17:41:05.345Z',
    updatedAt: '2022-03-30T17:41:05.345Z',
  },
];

describe('[COMPONENTS]: AccordionItemView', () => {
  test('should render accordion item with info.', () => {
    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: () => (
        <FilterProvider>
          <AccordionItemView title="Microprocessor" info={microprocessorsInfo} />
        </FilterProvider>
      ),
    });

    for (const info of microprocessorsInfo) {
      expect(getByText(info.description)).toBeInTheDocument();
    }
  });

  test('should render apply filter btn when Item has selected items.', async () => {
    const setShowApplyBtnMock = jest.fn();

    const { getByText } = setupAndRenderComponent({
      state: rootStateMock,
      component: () => (
        <FilterContext.Provider
          value={{
            ...filterContextValuesMock,
            hasSelectedItems: true,
            setIsShownApplyBtn: setShowApplyBtnMock,
          }}
        >
          <div style={{ height: '100%', width: '100%' }}>
            <AccordionItemView title="Microprocessor" info={microprocessorsInfo} />
          </div>
        </FilterContext.Provider>
      ),
    });

    expect(setShowApplyBtnMock).toBeCalledWith(true);

    const header = getByText(/Microprocessor/i);

    fireEvent.click(header);

    expect(setShowApplyBtnMock).lastCalledWith(false);
  });
});
