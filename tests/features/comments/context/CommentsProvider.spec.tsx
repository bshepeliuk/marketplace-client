/* eslint-disable max-len */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import LoadMoreButton from '@features/comments/atoms/LoadMoreButton';
import * as ReactRedux from 'react-redux';
import {
  CommentsContext,
  CommentsProvider,
} from '@features/comments/context/CommentsContext';
import useGetMoreComments from '@features/comments/hooks/useGetMoreComments';
import CommentRow from '@features/comments/components/CommentRow';
import CommentFormView from '@src/features/comments/components/CommentForm';
import useAddComment from '@features/comments/hooks/useAddComment';
import useUpdateComment from '@features/comments/hooks/useUpdateComment';
import useDeleteComment from '@features/comments/hooks/useDeleteComment';
import { Wrapper } from '../../../wrapper';
import { commentMock, deviceMock, replyMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const mockDeviceId = deviceMock.id;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ deviceId: mockDeviceId }),
}));
jest.mock('@features/comments/hooks/useGetMoreComments');
jest.mock('@features/comments/hooks/useAddComment');
jest.mock('@src/features/comments/hooks/useUpdateComment');
jest.mock('@features/comments/hooks/useDeleteComment');

const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');

describe('[CONTEXT]: CommentsProvider', () => {
  const dispatch = jest.fn();

  const onAddMock = jest.fn().mockImplementationOnce(() => Promise.resolve());
  const onUpdateMock = jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve());
  const onDeleteMock = jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve());

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch);

    (useAddComment as jest.Mock).mockImplementation(() => ({
      onAdd: onAddMock,
      isCreating: false,
      isCreatingError: false,
    }));

    (useUpdateComment as jest.Mock).mockImplementation(() => ({
      onUpdate: onUpdateMock,
      isUpdating: false,
      isUpdatingError: false,
    }));

    (useDeleteComment as jest.Mock).mockImplementation(() => ({
      onDelete: onDeleteMock,
      isDeleting: false,
      isDeletingError: false,
    }));
  });

  test('should dispatch thunk for loading more comments.', async () => {
    const mockGetMoreByDeviceId = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve());

    (useGetMoreComments as jest.Mock).mockImplementation(() => ({
      getMoreByDeviceId: mockGetMoreByDeviceId,
      hasMore: true,
    }));

    const { getByText } = render(
      <CommentsProvider>
        <LoadMoreButton />
      </CommentsProvider>,

      {
        wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
      },
    );

    const loadMoreCommentsBtn = getByText(/show more comments/i);

    fireEvent.click(loadMoreCommentsBtn);

    expect(mockGetMoreByDeviceId).toBeCalledTimes(1);
  });

  it('should have initial height (30px) for each row and method for changing height by index.', () => {
    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            const index = 1;
            const height = 200;

            return (
              <div>
                <h1>size: {value?.getSize(1)}</h1>
                <button
                  type="button"
                  onClick={() => value?.setSize(index, height)}
                >
                  set size
                </button>
              </div>
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText, rerender } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(/size: 30/i)).toBeInTheDocument();

    fireEvent.click(getByText(/set size/i));

    rerender(UI);

    expect(getByText(/size: 200/i)).toBeInTheDocument();
  });

  it('should collapse all/expand all replies on button click.', () => {
    const UI = (
      <CommentsProvider>
        <CommentRow index={0} data={{ comments: [commentMock] }} />
      </CommentsProvider>
    );

    const { getByText, queryByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(replyMock.body, { exact: false })).toBeInTheDocument();

    fireEvent.click(getByText(/collapse all/i));

    expect(queryByText(replyMock.body, { exact: false })).toBeNull();

    fireEvent.click(getByText(/expand all/i));

    expect(getByText(replyMock.body, { exact: false })).toBeInTheDocument();
  });

  it('should set state according to comment action (editing or replying).', () => {
    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            return (
              <>
                <h1>active commentId: {value?.activeComment?.id}</h1>
                <p>action: {value?.activeComment?.type}</p>
                <CommentRow index={0} data={{ comments: [commentMock] }} />;
              </>
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText, queryByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/collapse all/i));

    fireEvent.click(getByText(/edit/i));

    expect(
      getByText(`active commentId: ${commentMock.id}`, { exact: false }),
    ).toBeInTheDocument();
    expect(getByText(/action: editing/i)).toBeInTheDocument();

    fireEvent.click(getByText(/^edit$/));

    expect(queryByText(/action: editing/i)).toBeNull();
  });

  it('should add comment successfully.', async () => {
    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            return (
              <CommentFormView
                handleSubmit={(body) => {
                  value?.onAddComment({
                    body,
                    deviceId: deviceMock.id,
                    parentId: commentMock.id,
                  });
                }}
              />
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText, getByPlaceholderText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    const TextArea = getByPlaceholderText(/Please enter your message here.../);

    expect(TextArea).toBeInTheDocument();

    const commentBody = 'some comment!';

    fireEvent.change(TextArea, { target: { value: commentBody } });
    fireEvent.click(getByText(/send/));

    await waitFor(() => {
      expect(onAddMock).toBeCalledWith({
        body: commentBody,
        deviceId: deviceMock.id,
        parentId: commentMock.id,
      });
    });
  });

  it('should update comment successfully.', async () => {
    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            return (
              <CommentFormView
                handleSubmit={(body) => {
                  value?.onEditComment({
                    body,
                    commentId: commentMock.id,
                  });
                }}
              />
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText, getByPlaceholderText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    const TextArea = getByPlaceholderText(/Please enter your message here.../);

    expect(TextArea).toBeInTheDocument();

    const commentBody = 'updated comment!';

    fireEvent.change(TextArea, { target: { value: commentBody } });
    fireEvent.click(getByText(/send/));

    await waitFor(() => {
      expect(onUpdateMock).toBeCalledWith({
        body: commentBody,
        commentId: commentMock.id,
      });
    });
  });

  it('should delete comment successfully.', async () => {
    const UI = (
      <CommentsProvider>
        <CommentRow index={0} data={{ comments: [commentMock] }} />;
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/collapse all/i));

    fireEvent.click(getByText(/delete/));

    await waitFor(() => {
      expect(onDeleteMock).toBeCalledWith({
        commentId: commentMock.id,
      });
    });
  });

  it('isGoTopBtnVisible should be visible in case user scrolls down.', () => {
    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            return (
              <div>
                <h1>
                  isGoTopBtnVisible: {value?.isGoTopBtnVisible.toString()}
                </h1>
                <button
                  type="button"
                  onClick={() => value?.onListScroll({ scrollOffset: 800 })}
                >
                  scroll
                </button>
              </div>
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(/isGoTopBtnVisible: false/)).toBeInTheDocument();

    fireEvent.click(getByText(/scroll/));

    expect(getByText(/isGoTopBtnVisible: true/)).toBeInTheDocument();
  });

  it('isGoTopBtnVisible should be invisible in case user scrolls up.', () => {
    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            return (
              <div>
                <h1>
                  isGoTopBtnVisible: {value?.isGoTopBtnVisible.toString()}
                </h1>
                <button
                  type="button"
                  onClick={() => value?.onListScroll({ scrollOffset: 0 })}
                >
                  scroll
                </button>
              </div>
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/scroll/));

    expect(getByText(/isGoTopBtnVisible: false/)).toBeInTheDocument();
  });

  it('AVG row height', () => {
    const sizeList = [200, 400, 600];

    const UI = (
      <CommentsProvider>
        <CommentsContext.Consumer>
          {(value) => {
            return (
              <div>
                <h1>avg height: {value?.getAvgRowHeight()}</h1>
                <button
                  type="button"
                  onClick={() => {
                    value?.setSize(0, sizeList[0]);
                    value?.setSize(1, sizeList[1]);
                    value?.setSize(2, sizeList[2]);
                  }}
                >
                  setup size
                </button>
              </div>
            );
          }}
        </CommentsContext.Consumer>
      </CommentsProvider>
    );

    const { getByText, rerender } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    fireEvent.click(getByText(/setup size/));

    rerender(UI);

    const heightSum = sizeList.reduce((acc, curr) => acc + curr, 0);
    const avgHeight = Math.floor(heightSum / sizeList.length);

    expect(getByText(`avg height: ${avgHeight}`)).toBeInTheDocument();
  });
});
