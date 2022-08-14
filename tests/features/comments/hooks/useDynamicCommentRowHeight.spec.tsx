import { renderHook } from '@testing-library/react-hooks';
// eslint-disable-next-line max-len
import useDynamicCommentRowHeight from '@features/comments/hooks/useDynamicCommentRowHeight';
import React, { MutableRefObject } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { CommentsContext } from '@src/features/comments/context/CommentsContext';
import store from '@src/app/store';
import { commentsContextValuesMock } from '../../../mocks/data';

describe('[HOOKS]: useDynamicCommentRowHeight', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set size for item by index', () => {
    const rowIndex = 1;

    const height = 40;
    const getBoundingClientRectMock = jest.fn().mockReturnValue({
      height,
      left: 51,
      width: 200,
      x: 51,
      y: 250,
      top: 250,
      right: 251,
      bottom: 290,
    });

    const rowRef = {
      current: {
        getBoundingClientRect: getBoundingClientRectMock,
      },
    } as unknown as MutableRefObject<HTMLDivElement>;

    renderHook(() => useDynamicCommentRowHeight({ rowRef, rowIndex }), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Provider store={store}>
          <MemoryRouter>
            <CommentsContext.Provider value={commentsContextValuesMock}>
              {props.children}
            </CommentsContext.Provider>
          </MemoryRouter>
        </Provider>
      ),
    });

    expect(commentsContextValuesMock.setSize).toBeCalledWith(rowIndex, height);
  });

  test('should not call setSize method when rowRef is equal to null.', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const rowRef = null as unknown as MutableRefObject<null>;

    renderHook(() => useDynamicCommentRowHeight({ rowRef, rowIndex: 1 }), {
      wrapper: (props: { children: React.ReactNode }) => (
        <Provider store={store}>
          <MemoryRouter>
            <CommentsContext.Provider value={commentsContextValuesMock}>
              {props.children}
            </CommentsContext.Provider>
          </MemoryRouter>
        </Provider>
      ),
    });

    expect(commentsContextValuesMock.setSize).not.toBeCalled();
  });
});
