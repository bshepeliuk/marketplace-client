import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { BASE_API_URL } from '@src/common/constants';
import {
  CommentsContext,
  CommentsProvider,
} from '@features/comments/context/CommentsContext';
import CommentView from '@features/comments/components/CommentView';

import { Wrapper } from '../../../wrapper';
import { commentMock, commentsContextValuesMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const server = setupServer(
  rest.get(`${BASE_API_URL}/comments/:deviceId`, (req, res, ctx) => {
    return res(ctx.json({ comments: [] }));
  }),
);

describe('[COMPONENTS]: CommentView', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => server.close());

  afterEach(() => {
    server.resetHandlers();
    jest.clearAllMocks();
  });

  it('should render comment.', () => {
    const UI = (
      <CommentsProvider>
        <CommentView comment={commentMock} />
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(commentMock.body, { exact: false })).toBeInTheDocument();
    expect(
      getByText(commentMock.fullName, { exact: false }),
    ).toBeInTheDocument();

    expect(getByText(/edit/)).toBeInTheDocument();
    expect(getByText(/delete/)).toBeInTheDocument();
    expect(getByText(/reply/)).toBeInTheDocument();
  });

  it('should set activeComment according to action.', () => {
    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            return (
              <>
                <h1>action: {value?.activeComment?.type}</h1>
                <CommentView comment={commentMock} />
              </>
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/edit/));

    expect(getByText(/action: editing/)).toBeInTheDocument();

    fireEvent.click(getByText(/reply/));

    expect(getByText(/action: replying/)).toBeInTheDocument();
  });

  it('should save updated comment.', async () => {
    const onEditMock = jest.fn();

    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          activeComment: { id: commentMock.id, type: 'editing' },
          onEditComment: onEditMock,
          comments: [commentMock],
        }}
      >
        <CommentView comment={commentMock} />
      </CommentsContext.Provider>
    );

    const { getByText, getByPlaceholderText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/edit/));

    const newCommentValue = 'new comment value';

    fireEvent.change(
      getByPlaceholderText(/Please enter your message here.../),
      { target: { value: newCommentValue } },
    );

    fireEvent.click(getByText(/send/));

    await waitFor(() => {
      expect(onEditMock).toBeCalledWith({
        body: newCommentValue,
        commentId: commentMock.id,
      });
    });
  });

  it('should add reply.', async () => {
    const onAddMock = jest.fn();

    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          activeComment: { id: commentMock.id, type: 'replying' },
          onAddComment: onAddMock,
          comments: [commentMock],
        }}
      >
        <CommentView comment={commentMock} />
      </CommentsContext.Provider>
    );

    const { getByText, getByPlaceholderText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/reply/));

    const replyValue = 'new reply';

    fireEvent.change(
      getByPlaceholderText(/Please enter your message here.../),
      { target: { value: replyValue } },
    );

    fireEvent.click(getByText(/send/));

    await waitFor(() => {
      expect(onAddMock).toBeCalledWith({
        body: replyValue,
        deviceId: commentMock.deviceId,
        parentId: commentMock.id,
      });
    });
  });

  it('should turn on replying mode.', async () => {
    const setActiveCommentMock = jest.fn();

    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          setActiveComment: setActiveCommentMock,
        }}
      >
        <CommentView comment={commentMock} />
      </CommentsContext.Provider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/reply/));

    await waitFor(() => {
      expect(setActiveCommentMock).toBeCalledWith({
        id: commentMock.id,
        type: 'replying',
      });
    });
  });

  it('should not turn on replying mode when isLoggedIn is equal to false.', async () => {
    const setActiveCommentMock = jest.fn();

    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          setActiveComment: setActiveCommentMock,
        }}
      >
        <CommentView comment={commentMock} />
      </CommentsContext.Provider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => (
        <Wrapper
          {...props}
          state={{
            ...rootStateMock,
            auth: {
              ...rootStateMock.auth,
              isLoggedIn: false,
            },
          }}
        />
      ),
    });

    fireEvent.click(getByText(/reply/));

    await waitFor(() => {
      expect(setActiveCommentMock).not.toBeCalled();
    });
  });

  it('should turn on editing mode.', async () => {
    const setActiveCommentMock = jest.fn();

    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          setActiveComment: setActiveCommentMock,
        }}
      >
        <CommentView comment={commentMock} />
      </CommentsContext.Provider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/edit/));

    await waitFor(() => {
      expect(setActiveCommentMock).toBeCalledWith({
        id: commentMock.id,
        type: 'editing',
      });
    });
  });

  it('should not turn on editing mode when isLoggedIn is equal to false.', async () => {
    const setActiveCommentMock = jest.fn();

    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          setActiveComment: setActiveCommentMock,
        }}
      >
        <CommentView comment={commentMock} />
      </CommentsContext.Provider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => (
        <Wrapper
          {...props}
          state={{
            ...rootStateMock,
            auth: {
              ...rootStateMock.auth,
              isLoggedIn: false,
            },
          }}
        />
      ),
    });

    fireEvent.click(getByText(/edit/));

    await waitFor(() => {
      expect(setActiveCommentMock).not.toBeCalled();
    });
  });
});
