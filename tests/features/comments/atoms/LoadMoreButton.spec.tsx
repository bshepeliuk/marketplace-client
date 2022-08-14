import React from 'react';
import LoadMoreButton from '@src/features/comments/atoms/LoadMoreButton';
import { CommentsContext } from '@src/features/comments/context/CommentsContext';
import { fireEvent, render } from '@testing-library/react';
import { Wrapper } from '../../../wrapper';
import { commentsContextValuesMock } from '../../../mocks/data';

describe('[ATOMS]: LoadMoreButton', () => {
  test('should load comments on click.', async () => {
    const getMoreCommentsMock = jest.fn();

    const { getByText } = render(
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          getMoreComments: getMoreCommentsMock,
        }}
      >
        <CommentsContext.Consumer>
          {() => <LoadMoreButton />}
        </CommentsContext.Consumer>
      </CommentsContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const LoadMoreBtn = getByText(/show more comments/i);

    expect(LoadMoreBtn).toBeInTheDocument();

    fireEvent.click(LoadMoreBtn);

    expect(getMoreCommentsMock).toBeCalledTimes(1);
  });

  test('should render button for loading more comments.', async () => {
    const { getByText } = render(
      <CommentsContext.Provider value={commentsContextValuesMock}>
        <CommentsContext.Consumer>
          {() => <LoadMoreButton />}
        </CommentsContext.Consumer>
      </CommentsContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    expect(getByText(/show more comments/i)).toBeInTheDocument();
  });

  test('should render loader when comments are loading.', async () => {
    const { getByText } = render(
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          isLoading: true,
        }}
      >
        <CommentsContext.Consumer>
          {() => <LoadMoreButton />}
        </CommentsContext.Consumer>
      </CommentsContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    expect(getByText(/loading.../i)).toBeInTheDocument();
  });
});
