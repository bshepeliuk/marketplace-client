import React from 'react';
import RepliesVisibilityButton from '@features/comments/atoms/RepliesVisibilityButton';
import { CommentsContext } from '@src/features/comments/context/CommentsContext';
import { fireEvent, render } from '@testing-library/react';
import { Wrapper } from '../../../wrapper';
import { commentsContextValuesMock } from '../../../mocks/data';

describe('[ATOMS]: RepliesVisibilityButton', () => {
  test('should render button for expand all replies.', async () => {
    const commentId = 1;

    const toggleRepliesVisibilityMock = jest.fn();

    const { getByText } = render(
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          checkAreRepliesVisible: () => true,
          toggleRepliesVisibility: toggleRepliesVisibilityMock,
        }}
      >
        <CommentsContext.Consumer>
          {() => <RepliesVisibilityButton commentId={commentId} />}
        </CommentsContext.Consumer>
      </CommentsContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const ExpandAllBtn = getByText(/expand all/i);

    expect(ExpandAllBtn).toBeInTheDocument();

    fireEvent.click(ExpandAllBtn);

    expect(toggleRepliesVisibilityMock).toBeCalledWith(commentId);
  });

  test('should render button for collapse all replies.', async () => {
    const commentId = 1;

    const toggleRepliesVisibilityMock = jest.fn();

    const { getByText } = render(
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          checkAreRepliesVisible: () => false,
          toggleRepliesVisibility: toggleRepliesVisibilityMock,
        }}
      >
        <CommentsContext.Consumer>
          {() => <RepliesVisibilityButton commentId={commentId} />}
        </CommentsContext.Consumer>
      </CommentsContext.Provider>,
      {
        wrapper: Wrapper,
      },
    );

    const ExpandAllBtn = getByText(/collapse all/i);

    expect(ExpandAllBtn).toBeInTheDocument();

    fireEvent.click(ExpandAllBtn);

    expect(toggleRepliesVisibilityMock).toBeCalledWith(commentId);
  });
});
