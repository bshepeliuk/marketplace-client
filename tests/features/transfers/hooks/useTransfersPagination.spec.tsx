import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import * as ReactRedux from 'react-redux';

import useTransfersPagination from '@features/transfers/hooks/useTransfersPagination';
import { TRANSFERS_LIMIT } from '@features/transfers/constants';
import { getTransfers, transfersActions } from '@src/features/transfers/transfersSlice';
import server from '../../../mocks/api/server';
import { Wrapper } from '../../../wrapper';
import { rootStateMock } from '../../../mocks/stateMock';

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
const changeBoundIdsActionMock = jest.spyOn(transfersActions, 'changeBoundIds');

jest.mock('@src/features/transfers/transfersSlice', () => ({
  ...jest.requireActual('@src/features/transfers/transfersSlice'),
  __esModule: true,
  getTransfers: jest.fn(),
}));

describe('[HOOK]: useTransfersPagination', () => {
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
    const { result } = renderHook(() => useTransfersPagination(), { wrapper: Wrapper });

    expect(typeof result.current.onNext).toBe('function');
    expect(typeof result.current.onPrev).toBe('function');
    expect(result.current.isNextDisabled).toBeTruthy();
    expect(result.current.isPrevDisabled).toBeTruthy();
  });

  test('should fetch next chunk of items, isNextDisabled should be false.', () => {
    const startingAfter = 5;
    const state = {
      ...rootStateMock,
      transfers: {
        ...rootStateMock.transfers,
        startingAfter,
        items: [],
      },
    };

    const { result } = renderHook(() => useTransfersPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onNext();
    });

    expect(result.current.isNextDisabled).toBeFalsy();
    expect(getTransfers).toBeCalledWith({ startingAfter, endingBefore: undefined, limit: undefined });
  });

  test('should fetch previous chunk of items, isPrevDisabled should be false.', () => {
    const startingAfter = 5;
    const endingBefore = 1;
    const state = {
      ...rootStateMock,
      transfers: {
        ...rootStateMock.transfers,
        startingAfter,
        endingBefore,
        items: [],
      },
    };

    const { result } = renderHook(() => useTransfersPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onPrev();
    });

    expect(result.current.isPrevDisabled).toBeFalsy();
    expect(getTransfers).toBeCalledWith({ endingBefore, startingAfter: undefined, limit: undefined });
  });
  // eslint-disable-next-line max-len
  test('in case chunk with current bounds already fetched, should return next chunk from cache by startingAfter ID.', () => {
    const startingAfter = 5;
    const endingBefore = 1;
    const items = Array.from({ length: TRANSFERS_LIMIT * 2 }).map((_, idx) => ({ id: idx + 1 }));
    const startingAfterIdx = items.findIndex(({ id }) => id === startingAfter);
    const state = {
      ...rootStateMock,
      transfers: {
        ...rootStateMock.transfers,
        startingAfter,
        endingBefore,
        items,
      },
    };

    const START_IDX = startingAfterIdx + 1;
    const END_IDX = startingAfterIdx + TRANSFERS_LIMIT;
    const lastItem = items[items.length - 1];

    const endingBeforeId = items[START_IDX].id;
    const startingAfterId = items[END_IDX]?.id ?? lastItem.id;

    const { result } = renderHook(() => useTransfersPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onNext();
    });

    expect(result.current.isPrevDisabled).toBeFalsy();
    expect(getTransfers).not.toBeCalled();
    expect(changeBoundIdsActionMock).toBeCalledWith({ endingBefore: endingBeforeId, startingAfter: startingAfterId });
  });
  // eslint-disable-next-line max-len
  test('in case chunk with current bounds already fetched, should return previous chunk from cache by endingBefore ID.', () => {
    const items = Array.from({ length: TRANSFERS_LIMIT * 3 }).map((_, idx) => ({ id: idx + 1 }));
    const startingAfter = items[items.length - 1].id;
    const endingBefore = items[items.length - TRANSFERS_LIMIT].id;
    const endingBeforeIdx = items.findIndex(({ id }) => id === endingBefore);
    const startingAfterIdx = items.findIndex(({ id }) => id === startingAfter);
    const nextStartingAfter = items[startingAfterIdx - TRANSFERS_LIMIT].id;
    const nextEndingBefore = items[endingBeforeIdx - TRANSFERS_LIMIT].id;
    const state = {
      ...rootStateMock,
      transfers: {
        ...rootStateMock.transfers,
        startingAfter,
        endingBefore,
        items,
      },
    };

    const { result } = renderHook(() => useTransfersPagination(), {
      wrapper: (props: { children: React.ReactNode }) => <Wrapper {...props} state={state} />,
    });

    act(() => {
      result.current.onPrev();
    });

    expect(result.current.isPrevDisabled).toBeFalsy();
    expect(getTransfers).not.toBeCalled();
    expect(changeBoundIdsActionMock).toBeCalledWith({
      endingBefore: nextEndingBefore,
      startingAfter: nextStartingAfter,
    });
  });
});
