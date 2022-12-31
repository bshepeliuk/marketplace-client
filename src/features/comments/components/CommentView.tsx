import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useTypedSelector } from '@common/hooks/useTypedSelector';
import UserLogo from '@src/common/components/UserLogo/UserLogo';
import useCommentsContext from '../hooks/useCommentsContext';
import { FormWrapper, Body, BtnWrap, Comment, CreatedAt, FullName, LogoWrap } from '../styles/comments.styled';
import { IComment } from '../types';
import CommentFormView from './CommentForm';
import RepliesVisibilityButton from '../atoms/RepliesVisibilityButton';
import CommentInteractionButtons from './CommentInteractionButtons';

interface ICommentProps {
  comment: IComment;
  hasReplies?: boolean;
}

function CommentView({ comment, hasReplies = false }: ICommentProps) {
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  const { isCreating, isUpdating } = useTypedSelector((state) => state.comments);
  const { activeComment, clearActiveComment, onEditComment, onAddComment } = useCommentsContext();

  const createdAt = formatDistanceToNow(new Date(comment.createdAt).getTime(), {
    addSuffix: true,
  });

  const isCurrentComment = comment.id === activeComment?.id;
  const isReplying = isCurrentComment && activeComment?.type === 'replying';
  const isEditing = isCurrentComment && activeComment?.type === 'editing';
  const hasReplyingForm = isReplying && isLoggedIn;
  const hasEditingForm = isEditing && isLoggedIn;

  const parentId = comment.parentId ?? comment.id;

  const onEditSubmit = (body: string) => {
    return onEditComment({ body, commentId: comment.id });
  };

  const onReplySubmit = (body: string) => {
    return onAddComment({ body, parentId, deviceId: comment.deviceId });
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
        <CommentInteractionButtons comment={comment} />
      </BtnWrap>

      {hasReplies && comment && <RepliesVisibilityButton commentId={comment.id} />}

      {hasReplyingForm && (
        <FormWrapper>
          <CommentFormView
            isLoading={isCreating}
            handleSubmit={onReplySubmit}
            handleCancel={clearActiveComment}
            hasCancel
          />
        </FormWrapper>
      )}

      {hasEditingForm && (
        <FormWrapper>
          <CommentFormView
            isLoading={isUpdating}
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
