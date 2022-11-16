import React from 'react';
import { ListChildComponentProps } from 'react-window';
import CommentRow from './CommentRow';
import useCommentsContext from '../hooks/useCommentsContext';
import {
  CommentListContainer,
  GoToTopIcon,
  NoCommentsYet,
  RowContainer,
  ScrollTopButton,
  StyledList,
} from '../styles/comments.styled';
import calculateCommentListWidthBySize from '../helpers/calculateCommentListWidthBySize';
import CommentsListLoader from './CommentsListLoader';

interface IProps {
  size: {
    width: number;
  };
}

function CommentsList({ size }: IProps) {
  const context = useCommentsContext();
  const width = calculateCommentListWidthBySize(size);

  const { comments, listRef, getSize, isLoading, hasMore, onListScroll, goToTop, isGoTopBtnVisible } = context;

  const hasNoComments = !hasMore && comments.length === 0;

  const COMMENTS_COUNT = hasMore ? comments.length + 1 : comments.length;
  const HEIGHT = 680;

  if (isLoading) return <CommentsListLoader />;

  if (hasNoComments) {
    return <NoCommentsYet>No comments yet.</NoCommentsYet>;
  }

  return (
    <CommentListContainer>
      <StyledList
        ref={listRef}
        height={HEIGHT}
        width={width}
        className="scroll-smooth"
        onScroll={onListScroll}
        itemCount={COMMENTS_COUNT}
        itemSize={getSize}
        itemData={{ comments }}
      >
        {({ data, index, style }: ListChildComponentProps) => (
          <RowContainer style={style}>
            <CommentRow data={data} index={index} />
          </RowContainer>
        )}
      </StyledList>

      {isGoTopBtnVisible && (
        <ScrollTopButton data-button="go-to-top" type="button" onClick={goToTop}>
          <GoToTopIcon />
        </ScrollTopButton>
      )}
    </CommentListContainer>
  );
}

export default CommentsList;
