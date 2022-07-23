import UserLogo from '@src/common/components/UserLogo/UserLogo';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import useAddComment from '../hooks/useAddComment';
import { IComment, OnAddCommentType } from '../types';
import CommentFormView from './CommentForm';

interface ICommentListProps {
  comments: IComment[];
  deviceId: number;
}

function CommentsList({ comments, deviceId }: ICommentListProps) {
  const { onAdd } = useAddComment();
  const [activeComment, setActiveComment] = useState<IActiveComment | null>(
    null,
  );

  const rootComments = comments.filter((comment) => comment.parentId === null);

  const getRepliesByParentId = (parentId: number | null) => {
    return comments.filter((reply) => reply.parentId === parentId);
  };

  const onAddComment = ({ body, parentId }: OnAddCommentType) => {
    onAdd({ body, deviceId, parentId }).then(() => {
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
  margin-left: 150px;
`;

const FormWrapper = styled.div`
  grid-column: 2 / -1;
`;

interface IActiveComment {
  id: number;
}

interface ICommentProps {
  comment: IComment;
  replies?: IComment[];
  activeComment: IActiveComment | null;
  setActiveComment: Dispatch<SetStateAction<null | IActiveComment>>;
  onAdd: (params: OnAddCommentType) => void;
}

function CommentItem({
  comment,
  replies,
  activeComment,
  setActiveComment,
  onAdd,
}: ICommentProps) {
  const [isEditing, setIsEditing] = useState(false);

  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  const isReplying = comment.id === activeComment?.id;

  const onReply = () => {
    setActiveComment({ id: comment.id });
  };

  const onEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
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
          <EditButton type="button" onClick={onEdit}>
            edit
          </EditButton>
          <ReplyButton type="button" onClick={onReply}>
            reply
          </ReplyButton>
        </BtnWrap>

        {isReplying && (
          <FormWrapper>
            <CommentFormView
              handleSubmit={(body) => onAdd({ body, parentId })}
            />
          </FormWrapper>
        )}

        {isEditing && (
          <FormWrapper>
            <CommentFormView
              defaultValue={comment.body}
              handleSubmit={() => {}}
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

const EditButton = styled.button`
  width: max-content;
`;

const ReplyButton = styled.button`
  width: max-content;
`;

export default CommentsList;
