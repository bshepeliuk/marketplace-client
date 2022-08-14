import React from 'react';
import { render } from '@testing-library/react';
import { CommentsProvider } from '@features/comments/context/CommentsContext';
import CommentRow from '@features/comments/components/CommentRow';

import { Wrapper } from '../../../wrapper';
import { commentMock, deviceMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const mockDeviceId = deviceMock.id;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ deviceId: mockDeviceId }),
}));

describe('[COMPONENTS]: CommentRow', () => {
  it('in case this is last row should show load more comments button.', () => {
    const UI = (
      <CommentsProvider>
        <CommentRow index={1} data={{ comments: [commentMock] }} />
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(/show more comments/)).toBeInTheDocument();
  });
});
