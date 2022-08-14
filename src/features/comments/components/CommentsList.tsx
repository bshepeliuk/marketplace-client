import React from 'react';
import { VariableSizeList as List } from 'react-window';
import CommentRow from './CommentRow';
import useCommentsContext from '../hooks/useCommentsContext';
import { RowContainer, ScrollTopButton } from '../styles/comments.styled';
import calculateCommentListWidthBySize from '../helpers/calculateCommentListWidthBySize';

interface IProps {
  size: { width: number };
}

const HEIGHT = 600;

function CommentsList({ size }: IProps) {
  const context = useCommentsContext();
  const width = calculateCommentListWidthBySize(size);
  // prettier-ignore
  const {
    comments,
    listRef,
    getSize,
    isLoading,
    hasMore,
    onListScroll,
    goToTop,
    isGoTopBtnVisible,
  } = context;

  const COMMENTS_COUNT = hasMore ? comments.length + 1 : comments.length;

  if (isLoading) return <div>Loading...</div>;

  if (!hasMore && comments.length === 0) {
    return <div>No comments yet.</div>;
  }

  return (
    <>
      <List
        ref={listRef}
        height={HEIGHT}
        width={width}
        className="custom-scrollbar scroll-smooth"
        onScroll={onListScroll}
        itemCount={COMMENTS_COUNT}
        itemSize={getSize}
        itemData={{ comments }}
      >
        {({ data, index, style }) => (
          <RowContainer style={style}>
            <CommentRow data={data} index={index} />
          </RowContainer>
        )}
      </List>

      {isGoTopBtnVisible && (
        <ScrollTopButton type="button" onClick={goToTop}>
          go to top
        </ScrollTopButton>
      )}
    </>
  );
}

export default CommentsList;
