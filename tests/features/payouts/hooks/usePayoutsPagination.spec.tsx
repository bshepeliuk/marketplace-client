import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import * as ReactRedux from 'react-redux';

import { getPayouts, payoutsActions } from '@src/features/payouts/payoutsSlice';
import usePayoutsPagination from '@src/features/payouts/hooks/usePayoutsPagination';
import { PAYOUTS_LIMIT } from '@features/payouts/constants';
import server from '../../../mocks/api/server';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
const changeBoundIdsActionMock = jest.spyOn(payoutsActions, 'changeBoundIds');

jest.mock('@src/features/payouts/payoutsSlice', () => ({
  ...jest.requireActual('@src/features/payouts/payoutsSlice'),
  __esModule: true,
  getPayouts: jest.fn(),
}));

describe('[HOOK]: usePayoutsPagination', () => {
  const dispatch = jest.fn();

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  beforeEach(() => {
    server.resetHandlers();
    useDispatchMock.mockReturnValue(dispatch);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('isNextDisabled and isPrevDisabled flags should be true.', () => {
    const { result } = renderHook(() => usePayoutsPagination(), { wrapper: Wrapper });

    expect(typeof result.current.onNext).toBe('function');
    expect(typeof result.current.onPrev).toBe('function');
    expect(result.current.isNextDisabled).toBeTruthy();
    expect(result.current.isPrevDisabled).toBeTruthy();
  });

  test('should fetch next chunk of items, isNextDisabled should be false.', () => {
    const startingAfter = 5;
    const state = {
      ...rootStateMock,
      payouts: {
        ...rootStateMock.payouts,
        startingAfter,
        items: [],
      },
    };

    const { result } = renderHook(() => usePayoutsPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onNext();
    });

    expect(result.current.isNextDisabled).toBeFalsy();
    expect(getPayouts).toBeCalledWith({ startingAfter, endingBefore: undefined, limit: undefined });
  });

  test('should fetch previous chunk of items, isPrevDisabled should be false.', () => {
    const startingAfter = 5;
    const endingBefore = 1;
    const state = {
      ...rootStateMock,
      payouts: {
        ...rootStateMock.payouts,
        startingAfter,
        endingBefore,
        items: [],
      },
    };

    const { result } = renderHook(() => usePayoutsPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onPrev();
    });

    expect(result.current.isPrevDisabled).toBeFalsy();
    expect(getPayouts).toBeCalledWith({ endingBefore, startingAfter: undefined, limit: undefined });
  });
  // eslint-disable-next-line max-len
  test('in case chunk with current bounds already fetched, should return next chunk from cache by startingAfter ID.', () => {
    const startingAfter = 5;
    const endingBefore = 1;
    const items = Array.from({ length: PAYOUTS_LIMIT * 2 }).map((_, idx) => ({ id: idx + 1 }));
    const startingAfterIdx = items.findIndex(({ id }) => id === startingAfter);
    const state = {
      ...rootStateMock,
      payouts: {
        ...rootStateMock.payouts,
        startingAfter,
        endingBefore,
        items,
      },
    };

    const START_IDX = startingAfterIdx + 1;
    const END_IDX = startingAfterIdx + PAYOUTS_LIMIT;
    const lastItem = items[items.length - 1];

    const endingBeforeId = items[START_IDX].id;
    const startingAfterId = items[END_IDX]?.id ?? lastItem.id;

    const { result } = renderHook(() => usePayoutsPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onNext();
    });

    expect(result.current.isPrevDisabled).toBeFalsy();
    expect(getPayouts).not.toBeCalled();
    expect(changeBoundIdsActionMock).toBeCalledWith({ endingBefore: endingBeforeId, startingAfter: startingAfterId });
  });
  // eslint-disable-next-line max-len
  test('in case chunk with current bounds already fetched, should return previous chunk from cache by endingBefore ID.', () => {
    const items = Array.from({ length: PAYOUTS_LIMIT * 3 }).map((_, idx) => ({ id: idx + 1 }));
    const startingAfter = items[items.length - 1].id;
    const endingBefore = items[items.length - PAYOUTS_LIMIT].id;
    const endingBeforeIdx = items.findIndex(({ id }) => id === endingBefore);
    const startingAfterIdx = items.findIndex(({ id }) => id === startingAfter);
    const nextStartingAfter = items[startingAfterIdx - PAYOUTS_LIMIT].id;
    const nextEndingBefore = items[endingBeforeIdx - PAYOUTS_LIMIT].id;
    const state = {
      ...rootStateMock,
      payouts: {
        ...rootStateMock.payouts,
        startingAfter,
        endingBefore,
        items,
      },
    };

    const { result } = renderHook(() => usePayoutsPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onPrev();
    });

    expect(result.current.isPrevDisabled).toBeFalsy();
    expect(getPayouts).not.toBeCalled();
    expect(changeBoundIdsActionMock).toBeCalledWith({
      endingBefore: nextEndingBefore,
      startingAfter: nextStartingAfter,
    });
  });
});
