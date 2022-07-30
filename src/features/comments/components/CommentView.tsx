import React from 'react';
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
  const {
    activeComment,
    setActiveComment,
    clearActiveComment,
    onDeleteComment,
    onEditComment,
    onAddComment,
  } = useCommentsContext();

  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const passedTimeInMs = Date.now() - new Date(comment.createdAt).getTime();

  const isCurrentComment = comment.id === activeComment?.id;
  const isReplying = isCurrentComment && activeComment?.type === 'replying';
  const isEditing = isCurrentComment && activeComment?.type === 'editing';
  const canDelete = passedTimeInMs < COMMENT_ACTION_TIME_MS_LIMIT;

  const parentId = comment.parentId ?? comment.id;

  const onReply = () => {
    if (isReplying) return clearActiveComment();
    setActiveComment({ id: comment.id, type: 'replying' });
  };

  const onEdit = () => {
    if (isEditing) return clearActiveComment();
    setActiveComment({ id: comment.id, type: 'editing' });
  };

  const onDelete = () => {
    onDeleteComment({ commentId: comment.id });
  };

  const onEditSubmit = (body: string) => {
    // FIXME: attach replies to updated comment;
    onEditComment({ body, commentId: comment.id });
  };

  const onReplySubmit = (body: string) => {
    // FIXME: do not hide show more replies button when replies count equal to 1 and new reply was added.
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
        <EditButton type="button" onClick={onEdit}>
          edit
        </EditButton>

        <ReplyButton type="button" onClick={onReply}>
          reply
        </ReplyButton>

        {canDelete && (
          <DeleteButton type="button" onClick={onDelete}>
            delete
          </DeleteButton>
        )}
      </BtnWrap>

      {isReplying && (
        <FormWrapper>
          <CommentFormView
            handleSubmit={onReplySubmit}
            handleCancel={clearActiveComment}
            hasCancel
          />
        </FormWrapper>
      )}

      {isEditing && (
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
