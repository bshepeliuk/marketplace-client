import React, { useState } from 'react';
import { VariableSizeList as List } from 'react-window';
import CommentRow from './CommentRow';
import useCommentsContext from '../hooks/useCommentsContext';
import { ScrollTopButton } from '../styles/comments.styled';

function CommentsList() {
  const [isGoTopBtnVisible, setIsGoTopBtnVisible] = useState(false);
  const context = useCommentsContext();
  // prettier-ignore
  const {
    comments,
    listRef,
    getSize,
    isLoading,
    hasMore,
    getAvgRowHeight
  } = context;

  const COMMENTS_COUNT = hasMore ? comments.length + 1 : comments.length;

  const onScroll = (evt: { scrollOffset: number }) => {
    const avgRowHeight = getAvgRowHeight();
    const ROW_AMOUNT = 5;

    if (evt.scrollOffset > avgRowHeight * ROW_AMOUNT) {
      setIsGoTopBtnVisible(true);
    } else {
      setIsGoTopBtnVisible(false);
    }
  };

  const goToTop = () => listRef.current?.scrollToItem(0);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <List
        ref={listRef}
        height={500}
        width="100%"
        className="custom-scrollbar"
        onScroll={onScroll}
        itemCount={COMMENTS_COUNT}
        itemSize={getSize}
        itemData={{ comments }}
      >
        {({ data, index, style }) => (
          <div style={style}>
            <CommentRow data={data} index={index} />
          </div>
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
