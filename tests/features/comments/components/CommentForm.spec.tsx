import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CommentsProvider } from '@features/comments/context/CommentsContext';
import CommentFormView from '@features/comments/components/CommentForm';

import { Wrapper } from '../../../wrapper';
import { deviceMock } from '../../../mocks/data';
import { rootStateMock } from '../../../mocks/stateMock';

const mockDeviceId = deviceMock.id;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ deviceId: mockDeviceId }),
}));

describe('[COMPONENTS]: CommentFormView', () => {
  it('should call passed handleCancel function on cancel btn click.', () => {
    const cancelMock = jest.fn();

    const UI = (
      <CommentsProvider>
        <CommentFormView
          handleSubmit={() => {}}
          handleCancel={cancelMock}
          hasCancel
        />
      </CommentsProvider>
    );

    const { getByText } = render(UI, {
      wrapper: (props) => <Wrapper {...props} state={rootStateMock} />,
    });

    expect(getByText(/cancel/)).toBeInTheDocument();

    fireEvent.click(getByText(/cancel/));

    expect(cancelMock).toBeCalledTimes(1);
  });
});
