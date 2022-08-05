import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useTypedSelector } from '@common/hooks/useTypedSelector';
import notifications from '@src/common/utils/notifications';
import UserLogo from '@src/common/components/UserLogo/UserLogo';
import { COMMENT_ACTION_TIME_MS_LIMIT } from '../constants';
import useCommentsContext from '../hooks/useCommentsContext';
import {
  FormWrapper,
  Body,
  BtnWrap,
  Comment,
  CreatedAt,
  DeleteButton,
  EditButton,
  FullName,
  LogoWrap,
  ReplyButton,
} from '../styles/comments.styled';
import { IComment } from '../types';
import CommentFormView from './CommentForm';

interface ICommentProps {
  comment: IComment;
}

function CommentView({ comment }: ICommentProps) {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const {
    activeComment,
    setActiveComment,
    clearActiveComment,
    onDeleteComment,
    onEditComment,
    onAddComment,
  } = useCommentsContext();

  const createdAt = formatDistanceToNow(new Date(comment.createdAt).getTime(), {
    addSuffix: true,
  });
  const passedTimeInMs = Date.now() - new Date(comment.createdAt).getTime();

  const isCurrentComment = comment.id === activeComment?.id;
  const isReplying = isCurrentComment && activeComment?.type === 'replying';
  const isEditing = isCurrentComment && activeComment?.type === 'editing';
  const canDelete = passedTimeInMs < COMMENT_ACTION_TIME_MS_LIMIT;

  const parentId = comment.parentId ?? comment.id;

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

  const onDelete = () => {
    onDeleteComment({ commentId: comment.id });
  };

  const onEditSubmit = (body: string) => {
    onEditComment({ body, commentId: comment.id });
  };

  const onReplySubmit = (body: string) => {
    onAddComment({ body, parentId, deviceId: comment.deviceId });
  };

  return (
    <Comment key={`reply-${comment.id}`}>
      <LogoWrap>
        <UserLogo fullName={comment.fullName} size={50} />
      </LogoWrap>

      <FullName>{comment.fullName}</FullName>
      <Body>{comment.body}</Body>

      <CreatedAt>{createdAt}</CreatedAt>

      <BtnWrap>
        <EditButton type="button" onClick={turnOnEditMode}>
          edit
        </EditButton>

        <ReplyButton type="button" onClick={turnOnReplyMode}>
          reply
        </ReplyButton>

        {canDelete && isLoggedIn && (
          <DeleteButton type="button" onClick={onDelete}>
            delete
          </DeleteButton>
        )}
      </BtnWrap>

      {isReplying && isLoggedIn && (
        <FormWrapper>
          <CommentFormView
            handleSubmit={onReplySubmit}
            handleCancel={clearActiveComment}
            hasCancel
          />
        </FormWrapper>
      )}

      {isEditing && isLoggedIn && (
        <FormWrapper>
          <CommentFormView
            defaultValue={comment.body}
            handleSubmit={onEditSubmit}
            handleCancel={clearActiveComment}
            hasCancel
          />
        </FormWrapper>
      )}
    </Comment>
  );
}

export default CommentView;
