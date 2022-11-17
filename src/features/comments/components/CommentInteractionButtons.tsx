import React from 'react';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import notifications from '@src/common/utils/notifications';
import { COMMENT_ACTION_TIME_MS_LIMIT } from '../constants';
import useCommentsContext from '../hooks/useCommentsContext';
import { DeleteButton, EditButton, ReplyButton } from '../styles/comments.styled';
import { IComment } from '../types';

function CommentInteractionButtons({ comment }: { comment: IComment }) {
  const { user, isLoggedIn } = useTypedSelector((state) => state.auth);
  const { activeComment, setActiveComment, clearActiveComment, onDeleteComment } = useCommentsContext();

  const passedTimeInMs = Date.now() - new Date(comment.createdAt).getTime();

  const isCurrentComment = comment.id === activeComment?.id;
  const isReplying = isCurrentComment && activeComment?.type === 'replying';
  const isEditing = isCurrentComment && activeComment?.type === 'editing';
  const canDelete = passedTimeInMs < COMMENT_ACTION_TIME_MS_LIMIT;
  const canEdit = user?.fullName.toLowerCase() === comment.fullName.toLowerCase(); // TODO: add creatorId field to comment.

  const turnOnReplyMode = () => {
    if (!isLoggedIn) return notifications.info('Unauthorized!');
    if (isReplying) return clearActiveComment();

    setActiveComment({ id: comment.id, type: 'replying' });
  };

  const turnOnEditMode = () => {
    if (!isLoggedIn) return notifications.info('Unauthorized!');
    if (isEditing) return clearActiveComment();

    setActiveComment({ id: comment.id, type: 'editing' });
  };

  const onDelete = () => onDeleteComment({ commentId: comment.id });

  return (
    <>
      {canEdit && (
        <EditButton type="button" onClick={turnOnEditMode}>
          edit
        </EditButton>
      )}

      <ReplyButton type="button" onClick={turnOnReplyMode}>
        reply
      </ReplyButton>

      {canDelete && isLoggedIn && (
        <DeleteButton type="button" onClick={onDelete}>
          delete
        </DeleteButton>
      )}
    </>
  );
}

export default CommentInteractionButtons;
