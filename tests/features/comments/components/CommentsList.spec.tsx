import React from 'react';
import { render } from '@testing-library/react';
import {
  CommentsContext,
  CommentsProvider,
} from '@features/comments/context/CommentsContext';
import CommentsList from '@features/comments/components/CommentsList';

import { Wrapper } from '../../../wrapper';
import {
  commentMock,
  commentsContextValuesMock,
  deviceMock,
} from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const mockDeviceId = deviceMock.id;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ deviceId: mockDeviceId }),
}));

describe('[COMPONENTS]: CommentsList', () => {
  it('should render root comment.', () => {
    const UI = (
      <CommentsProvider>
        <CommentsList size={{ width: 500 }} />
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(commentMock.body, { exact: false })).toBeInTheDocument();
  });

  it('should render loader', () => {
    const UI = (
      <CommentsContext.Provider
        value={{ ...commentsContextValuesMock, isLoading: true }}
      >
        <CommentsList size={{ width: 500 }} />
      </CommentsContext.Provider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should render info message when device does not have comments yet.', () => {
    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          hasMore: false,
          comments: [],
        }}
      >
        <CommentsList size={{ width: 500 }} />
      </CommentsContext.Provider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(/no comments yet/i)).toBeInTheDocument();
  });

  it('should render go to top button when user scrolls down.', () => {
    const UI = (
      <CommentsContext.Provider
        value={{
          ...commentsContextValuesMock,
          comments: [commentMock],
          isGoTopBtnVisible: true,
        }}
      >
        <CommentsList size={{ width: 400 }} />
      </CommentsContext.Provider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(/go to top/i)).toBeInTheDocument();
  });
});
