import UserLogo from '@src/common/components/UserLogo/UserLogo';
import { IUpdateCommentParams } from '@src/common/types/apiTypes';
import { Nullable } from '@src/common/types/baseTypes';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { VariableSizeList as List } from 'react-window';
import styled from 'styled-components';
import { COMMENT_ACTION_TIME_MS_LIMIT, REPLIES_LIMIT } from '../constants';
import useAddComment from '../hooks/useAddComment';
import useDeleteComment from '../hooks/useDeleteComment';
import useGetRepliesByRootCommentId from '../hooks/useGetReplies';
import useUpdateComment from '../hooks/useUpdateComment';
import { IComment, IDeleteCommentParams, OnAddCommentType } from '../types';
import CommentFormView from './CommentForm';

const getRepliesCountFromTotalAmount = (repliesCount: number | undefined) => {
  if (repliesCount === undefined) return 0;
  return repliesCount < REPLIES_LIMIT ? repliesCount : REPLIES_LIMIT;
};

export const useWindowResize = () => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
};

interface ICommentListProps {
  comments: IComment[];
  deviceId: number;
}

interface IActiveComment {
  id: number;
  type: 'replying' | 'editing';
}

function CommentsList({ comments, deviceId }: ICommentListProps) {
  const listRef = useRef<any>();
  const [windowWidth] = useWindowResize();
  const sizeMap = useRef<{ [index: number]: number }>({});
  const setSize = useCallback((index: number, size: number) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = (index: number) => sizeMap.current[index] || 50;

  const { onAdd } = useAddComment();
  const { onUpdate } = useUpdateComment();
  const { onDelete } = useDeleteComment();
  // prettier-ignore
  const [activeComment, setActiveComment] = useState<Nullable<IActiveComment>>(null);

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
    <List
      ref={listRef}
      height={400}
      width="100%"
      itemCount={comments.length}
      itemSize={getSize}
      itemData={{
        comments,
        setActiveComment,
        activeComment,
        setSize,
        windowWidth,
        onAdd: onAddComment,
        onEdit: onEditComment,
        onDelete: onDeleteComment,
      }}
    >
      {({ data, index, style }) => (
        <div style={style}>
          <Row
            data={data}
            index={index}
            setSize={setSize}
            windowWidth={windowWidth}
          />
        </div>
      )}
    </List>
  );
}

interface IData {
  activeComment: IActiveComment | null;
  setActiveComment: Dispatch<SetStateAction<null | IActiveComment>>;
  onAdd: (params: OnAddCommentType) => void;
  onEdit: (params: IUpdateCommentParams) => void;
  onDelete: (params: IDeleteCommentParams) => void;
  comments: IComment[];
}

interface IRowProps {
  data: IData;
  setSize: (index: number, size: number) => void;
  index: number;
  windowWidth: number;
}

function Row({ data, index, setSize, windowWidth }: IRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  // prettier-ignore
  const {
    fetchReplies,
    replies,
    isRepliesLoading,
  } = useGetRepliesByRootCommentId(data.comments[index].id);

  // prettier-ignore
  const {
    activeComment,
    setActiveComment,
    onAdd,
    onEdit,
    onDelete,
  } = data;

  const comment = data.comments[index];

  const repliesCount = getRepliesCountFromTotalAmount(comment.repliesCount);
  const hasRepliesCount = repliesCount > 0;

  useEffect(() => {
    let didMount = false;
    if (rowRef.current === null) return;

    if (!didMount) {
      setSize(index, rowRef.current.getBoundingClientRect().height);
    }

    return () => {
      didMount = true;
    };
  }, [setSize, index, windowWidth]);

  const hasNoMore = repliesCount > 0 && replies.length < REPLIES_LIMIT;

  const replyBtnContent = isRepliesLoading
    ? 'Loading...'
    : `show ${repliesCount} replies.`;

  return (
    <div ref={rowRef}>
      <CommentView
        key={comment.id}
        comment={comment}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        onDelete={onDelete}
        onEdit={onEdit}
        onAdd={onAdd}
      />

      <ReplyList>
        {replies.map((item) => {
          return (
            <CommentView
              key={`reply-${item.id}`}
              comment={item}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              onDelete={onDelete}
              onEdit={onEdit}
              onAdd={onAdd}
            />
          );
        })}

        {hasRepliesCount && hasNoMore && (
          <ShowRepliesButton type="button" onClick={fetchReplies}>
            {replyBtnContent}
          </ShowRepliesButton>
        )}
      </ReplyList>
    </div>
  );
}

interface ICommentProps {
  activeComment: IActiveComment | null;
  setActiveComment: Dispatch<SetStateAction<null | IActiveComment>>;
  onAdd: (params: OnAddCommentType) => void;
  onEdit: (params: IUpdateCommentParams) => void;
  onDelete: (params: IDeleteCommentParams) => void;
  comment: IComment;
}

function CommentView({
  activeComment,
  setActiveComment,
  onAdd,
  onEdit,
  onDelete,
  comment,
}: ICommentProps) {
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const passedTimeInMs = Date.now() - new Date(comment.createdAt).getTime();

  const isCurrentComment = comment.id === activeComment?.id;
  const isReplying = isCurrentComment && activeComment?.type === 'replying';
  const isEditing = isCurrentComment && activeComment?.type === 'editing';
  const canDelete = passedTimeInMs < COMMENT_ACTION_TIME_MS_LIMIT;

  const parentId = comment.parentId ?? comment.id;

  const onCancel = () => {
    setActiveComment(null);
  };

  const onReplyComment = () => {
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

  return (
    <Comment key={`reply-${comment.id}`}>
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
        <ReplyButton type="button" onClick={onReplyComment}>
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
  );
}

const ReplyList = styled.ul`
  margin-left: 50px;
`;

const FormWrapper = styled.div`
  grid-column: 2 / -1;
`;

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
  height: 100%;
`;

const BtnWrap = styled.div`
  grid-area: BTN;
  justify-self: end;
  height: 20px;
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

const ShowRepliesButton = styled.button`
  white-space: nowrap;
  width: max-content;
  border: none;
  background-color: rgba(149, 165, 166, 0.22);
  border-radius: 50px;
  padding: 2px 16px;
  color: rgba(52, 73, 94, 1);
  display: flex;
  cursor: pointer;
`;

const EditButton = styled(CommentBaseButton)``;
const ReplyButton = styled(CommentBaseButton)``;
const DeleteButton = styled(CommentBaseButton)``;

export default CommentsList;
