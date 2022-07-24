import UserLogo from '@src/common/components/UserLogo/UserLogo';
import sortDate from '@src/common/helpers/sortDate';
import { IUpdateCommentParams } from '@src/common/types/apiTypes';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import useAddComment from '../hooks/useAddComment';
import useDeleteComment from '../hooks/useDeleteComment';
import useUpdateComment from '../hooks/useUpdateComment';
import { IComment, IDeleteCommentParams, OnAddCommentType } from '../types';
import CommentFormView from './CommentForm';

interface ICommentListProps {
  comments: IComment[];
  deviceId: number;
}

function CommentsList({ comments, deviceId }: ICommentListProps) {
  const { onAdd } = useAddComment();
  const { onUpdate } = useUpdateComment();
  const { onDelete } = useDeleteComment();

  const [activeComment, setActiveComment] = useState<IActiveComment | null>(
    null,
  );

  const rootComments = sortDate({
    data: comments,
    sortField: 'createdAt',
  }).filter((comment) => comment.parentId === null);

  const getRepliesByParentId = (parentId: number | null) => {
    return sortDate({
      data: comments,
      sortField: 'createdAt',
    }).filter((reply) => reply.parentId === parentId);
  };

  const onAddComment = ({ body, parentId }: OnAddCommentType) => {
    onAdd({ body, deviceId, parentId }).then(() => {
      setActiveComment(null);
    });
  };

  const onEditComment = ({ body, commentId }: IUpdateCommentParams) => {
    onUpdate({ body, commentId }).then(() => {
      setActiveComment(null);
    });
  };

  const onDeleteComment = ({ commentId }: IDeleteCommentParams) => {
    onDelete({ commentId }).then(() => {
      setActiveComment(null);
    });
  };

  return (
    <List>
      {rootComments.map((comment) => {
        const replies = getRepliesByParentId(comment.id);

        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            replies={replies}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            onAdd={onAddComment}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
          />
        );
      })}
    </List>
  );
}

const List = styled.ul`
  width: 500px;
  margin: auto;
`;

const ReplyList = styled.ul`
  margin-left: 50px;
`;

const FormWrapper = styled.div`
  grid-column: 2 / -1;
`;

interface IActiveComment {
  id: number;
  type: 'replying' | 'editing';
}

interface ICommentProps {
  comment: IComment;
  replies?: IComment[];
  activeComment: IActiveComment | null;
  setActiveComment: Dispatch<SetStateAction<null | IActiveComment>>;
  onAdd: (params: OnAddCommentType) => void;
  onEdit: (params: IUpdateCommentParams) => void;
  onDelete: (params: IDeleteCommentParams) => void;
}

const COMMENT_ACTION_TIME_MS_LIMIT = 1000 * 60 * 5;

function CommentItem(props: ICommentProps) {
  const {
    comment,
    replies,
    activeComment,
    setActiveComment,
    onAdd,
    onEdit,
    onDelete,
  } = props;

  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const passedTimeInMs = Date.now() - new Date(comment.createdAt).getTime();

  const isCurrentComment = comment.id === activeComment?.id;
  const isReplying = isCurrentComment && activeComment?.type === 'replying';
  const isEditing = isCurrentComment && activeComment?.type === 'editing';
  const canDelete = passedTimeInMs < COMMENT_ACTION_TIME_MS_LIMIT;

  const onCancel = () => {
    setActiveComment(null);
  };

  const onReply = () => {
    if (isReplying) {
      onCancel();
      return;
    }

    setActiveComment({ id: comment.id, type: 'replying' });
  };

  const onEditComment = () => {
    if (isEditing) {
      onCancel();
      return;
    }

    setActiveComment({ id: comment.id, type: 'editing' });
  };

  const onDeleteComment = () => {
    onDelete({ commentId: comment.id });
  };

  const parentId = comment.parentId ?? comment.id;

  return (
    <>
      <Comment>
        <LogoWrap>
          <UserLogo fullName={comment.fullName} size={50} />
        </LogoWrap>

        <FullName>{comment.fullName}</FullName>
        <Body>{comment.body}</Body>
        <CreatedAt>{createdAt}</CreatedAt>

        <BtnWrap>
          <EditButton type="button" onClick={onEditComment}>
            edit
          </EditButton>
          <ReplyButton type="button" onClick={onReply}>
            reply
          </ReplyButton>
          {canDelete && (
            <DeleteButton type="button" onClick={onDeleteComment}>
              delete
            </DeleteButton>
          )}
        </BtnWrap>

        {isReplying && (
          <FormWrapper>
            <CommentFormView
              handleSubmit={(body) => onAdd({ body, parentId })}
              handleCancel={onCancel}
              hasCancel
            />
          </FormWrapper>
        )}

        {isEditing && (
          <FormWrapper>
            <CommentFormView
              defaultValue={comment.body}
              handleSubmit={(body) => onEdit({ body, commentId: comment.id })}
              handleCancel={onCancel}
              hasCancel
            />
          </FormWrapper>
        )}
      </Comment>

      <ReplyList>
        {replies?.map((reply) => (
          <CommentItem
            key={reply.id}
            comment={reply}
            setActiveComment={setActiveComment}
            activeComment={activeComment}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </ReplyList>
    </>
  );
}

const LogoWrap = styled.div`
  grid-area: LOGO;
  justify-self: center;
`;

const Comment = styled.li`
  display: grid;
  grid-template-areas:
    'LOGO FULL-NAME CREATED-AT'
    'LOGO BODY BODY'
    'LOGO BTN BTN';
  grid-template-columns: 60px 150px 100px;
`;

const BtnWrap = styled.div`
  grid-area: BTN;
  justify-self: end;
`;

const FullName = styled.h1`
  grid-area: FULL-NAME;
  margin: 0;
  font-size: 18px;
  justify-self: start;
  color: #34495e;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  text-align: start;
`;

const Body = styled.p`
  grid-area: BODY;
  margin: 0;
  justify-self: start;
`;

const CreatedAt = styled.div`
  grid-area: CREATED-AT;
  justify-self: end;
`;

const CommentBaseButton = styled.button`
  width: max-content;
  border: none;
  background-color: transparent;
  color: #2c3e50;

  &::after {
    content: '';
    width: 100%;
    transform: scaleX(1);
    height: 1px;
    display: block;
    background-color: #2c3e50;
    transform-origin: center;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(0);
    transform-origin: center;
  }
`;

const EditButton = styled(CommentBaseButton)``;
const ReplyButton = styled(CommentBaseButton)``;
const DeleteButton = styled(CommentBaseButton)``;

export default CommentsList;
