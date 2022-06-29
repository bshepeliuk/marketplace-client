import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import useServeBrandSelect from '@features/addNewDevice/hooks/useServeBrandSelect';
import { renderHook, act } from '@testing-library/react-hooks';
import { Wrapper } from '../../../wrapper';
import sleep from '../../../helpers/sleep';

const server = setupServer();

describe('[HOOK]: useServeBrandSelect', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  test('should have brand select initial state', () => {
    const { result } = renderHook(() => useServeBrandSelect(), {
      wrapper: Wrapper,
    });

    expect(result.current.selectState.isClearable).toBeTruthy();
    expect(result.current.selectState.isDisabled).toBeFalsy();
    expect(result.current.selectState.isLoading).toBeFalsy();
    expect(result.current.selectState.isSearchable).toBeTruthy();
  });

  test('should set option when setOption was called', () => {
    const option = { label: 'NEW_OPTION', value: 'new_option' };

    const { result } = renderHook(() => useServeBrandSelect(), {
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
      label: 'NEW_SELECTED_OPTION',
      value: 'new_selected_option',
    };

    const { result } = renderHook(() => useServeBrandSelect(), {
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

    const { result } = renderHook(() => useServeBrandSelect(), {
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

  test('should call loadOptions when user is searching brands.', async () => {
    const brands = [
      {
        id: 1,
        name: 'ASUS',
        createdAt: '2021-06-24T05:59:49.863Z',
        updatedAt: '2021-06-24T05:59:49.863Z',
      },
      {
        id: 18,
        name: 'NEW_ASUS',
        createdAt: '2022-06-23T11:38:07.909Z',
        updatedAt: '2022-06-23T11:38:07.909Z',
      },
    ];

    server.use(
      rest.get(`${BASE_API_URL}/brands`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ brands }));
      }),
    );

    const { result } = renderHook(useServeBrandSelect, {
      wrapper: Wrapper,
    });

    const callback = jest.fn();

    act(() => {
      result.current.loadOptions('asus', callback);
    });

    await sleep(2000);

    expect(callback).toBeCalledWith([
      { label: 'ASUS', value: 'ASUS' },
      { label: 'NEW_ASUS', value: 'NEW_ASUS' },
    ]);
  });

  test('should set option when a new brand was created.', async () => {
    server.use(
      rest.post(`${BASE_API_URL}/brands`, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            brand: {
              id: 1,
              name: 'NEW_BRAND',
            },
          }),
        );
      }),
    );

    const { result, waitForNextUpdate } = renderHook(useServeBrandSelect, {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.onCreateOption('NEW_BRAND');
    });

    expect(result.current.selectState.isLoading).toBeTruthy();
    expect(result.current.selectState.isDisabled).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.selectState.isLoading).toBeFalsy();
    expect(result.current.selectState.isDisabled).toBeFalsy();
    expect(result.current.option).toEqual({
      label: 'NEW_BRAND',
      value: 'NEW_BRAND',
    });
  });

  test('isDisabled and isLoading should be true when brands is loading', async () => {
    const { result } = renderHook(useServeBrandSelect, {
      wrapper: (props) => (
        <Wrapper
          {...(props as object)}
          state={{
            brands: {
              isCreating: false,
              isCreatingError: false,
              isLoading: true,
              items: [],
            },
          }}
        />
      ),
    });

    expect(result.current.selectState.isLoading).toBeTruthy();
    expect(result.current.selectState.isDisabled).toBeTruthy();
  });
});
