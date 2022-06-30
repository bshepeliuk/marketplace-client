import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import useServeCategorySelect from '@features/addNewDevice/hooks/useServeCategorySelect';
import { renderHook, act } from '@testing-library/react-hooks';
import { Wrapper } from '../../../wrapper';
import sleep from '../../../helpers/sleep';

const server = setupServer();

describe('[HOOK]: useServeCategorySelect', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should have category select initial state', () => {
    const { result } = renderHook(useServeCategorySelect, {
      wrapper: Wrapper,
    });

    expect(result.current.selectState.isClearable).toBeTruthy();
    expect(result.current.selectState.isDisabled).toBeFalsy();
    expect(result.current.selectState.isLoading).toBeFalsy();
    expect(result.current.selectState.isSearchable).toBeTruthy();
  });

  test('should set option when setOption was called', () => {
    const option = { label: 'NEW_OPTION', value: 'new_option' };

    const { result } = renderHook(useServeCategorySelect, {
      wrapper: Wrapper,
    });

    expect(result.current.option).toBeNull();

    act(() => {
      result.current.setOption(option);
    });

    expect(result.current.option).toEqual(option);
    expect(result.current.shouldClear).toBeFalsy();
  });

  test('should set selected option onChange', () => {
    const option = {
      label: 'NEW_SELECTED_CATEGORY',
      value: 'new_selected_category',
    };

    const { result } = renderHook(useServeCategorySelect, {
      wrapper: Wrapper,
    });

    expect(result.current.option).toBeNull();

    act(() => {
      result.current.handleChange(option, { action: 'select-option' });
    });

    expect(result.current.option).toEqual(option);
  });

  test('should remove selected option when action is equal to "clear". ', () => {
    const option = {
      label: 'NEW_SELECTED_OPTION',
      value: 'new_selected_option',
    };

    const { result } = renderHook(useServeCategorySelect, {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setOption(option);
    });

    act(() => {
      result.current.handleChange(option, { action: 'clear' });
    });

    expect(result.current.option).toBeNull();
    expect(result.current.shouldClear).toBeTruthy();
  });

  test('should call loadOptions when user is searching categories.', async () => {
    const types = [
      {
        id: 1,
        name: 'laptops',
        createdAt: '2021-06-24T05:59:49.863Z',
        updatedAt: '2021-06-24T05:59:49.863Z',
      },
    ];

    server.use(
      rest.get(`${BASE_API_URL}/types`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ types }));
      }),
    );

    const { result } = renderHook(useServeCategorySelect, {
      wrapper: Wrapper,
    });

    const callback = jest.fn();

    act(() => {
      result.current.loadOptions('laptops', callback);
    });

    await sleep(2000);

    expect(callback).toBeCalledWith([{ label: 'laptops', value: 'laptops' }]);
  });

  test('should set option when a new category was created.', async () => {
    server.use(
      rest.post(`${BASE_API_URL}/types`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            type: {
              id: 1,
              name: 'NEW_CATEGORY',
            },
          }),
        );
      }),
    );

    const { result, waitForNextUpdate } = renderHook(useServeCategorySelect, {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.onCreateOption('NEW_CATEGORY');
    });

    expect(result.current.selectState.isLoading).toBeTruthy();
    expect(result.current.selectState.isDisabled).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.selectState.isLoading).toBeFalsy();
    expect(result.current.selectState.isDisabled).toBeFalsy();
    expect(result.current.option).toEqual({
      label: 'NEW_CATEGORY',
      value: 'NEW_CATEGORY',
    });
  });
  // eslint-disable-next-line max-len
  test('isDisabled and isLoading should be true when categories are loading', async () => {
    const state = {
      entities: {
        categories: {
          1: {
            id: 1,
            name: 'some_category',
          },
        },
      },
      categories: {
        isCreating: false,
        isCreatingError: false,
        isLoading: true,
        items: [1],
      },
    };

    const { result } = renderHook(useServeCategorySelect, {
      wrapper: (props) => <Wrapper {...(props as object)} state={state} />,
    });

    expect(result.current.selectState.isLoading).toBeTruthy();
    expect(result.current.selectState.isDisabled).toBeTruthy();
    expect(result.current.options).toHaveLength(state.categories.items.length);
  });
});
