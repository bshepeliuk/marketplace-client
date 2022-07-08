/* eslint-disable react/no-array-index-key */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';

export const List = styled.ul`
  display: inline-flex;
  flex-flow: row wrap;
  // width: max-content;
`;

export const ListItem = styled.li`
  color: #f97988;
  position: relative;
  cursor: pointer;
`;

export const StarWrapper = styled.div`
  position: absolute;
  top: 0;
`;

export const Wrapper = styled.div<{ widthInPercent: number }>`
  width: ${(props) => `${props.widthInPercent}%`};
  overflow: hidden;
  position: relative;
  z-index: 2;
`;

interface IProps {
  readonly totalStars: number;
  readonly precision?: number;
  readonly initRatingValue?: number;
}

function StarRatingView(props: IProps) {
  const { totalStars = 5, precision = 1, initRatingValue = -1 } = props;

  const containerRef = useRef<HTMLUListElement>(null);
  const [selectedStarIdx, setSelectedStarIdx] = useState(initRatingValue);
  const [hoveredStarIdx, setHoverStarIdx] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);

  const calculateRating = (evt: React.MouseEvent) => {
    if (containerRef.current === null) return -1;

    const { width, left } = containerRef.current.getBoundingClientRect();

    const percent = (evt.clientX - left) / width;
    const numberInStars = percent * totalStars;
    // prettier-ignore
    const nearestNumber = Math.round((numberInStars + precision) / precision) * precision;

    return Number(
      nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0),
    );
  };

  const onClick = (evt: React.MouseEvent) => {
    const rating = calculateRating(evt);
    setSelectedStarIdx(rating);
  };

  const onMouseOver = (evt: React.MouseEvent) => {
    const rating = calculateRating(evt);

    setIsHovered(true);
    setHoverStarIdx(rating);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setHoverStarIdx(-1);
  };

  return (
    <List ref={containerRef}>
      {[...Array(totalStars)].map((_, idx) => {
        const activeState = isHovered ? hoveredStarIdx : selectedStarIdx;

        const showEmptyIcon = activeState === -1 || activeState < idx + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;

        const isRatingEqualToIndex = Math.ceil(activeState) === idx + 1;

        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        const widthInPercent = showRatingWithPrecision
          ? (activeState % 1) * 100
          : 0;

        return (
          <ListItem
            key={idx}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
          >
            <Wrapper widthInPercent={widthInPercent}>
              <AiFillStar />
            </Wrapper>

            <StarWrapper>
              {showEmptyIcon ? (
                <AiOutlineStar color="#c8d6e5" />
              ) : (
                <AiFillStar />
              )}
            </StarWrapper>
          </ListItem>
        );
      })}
    </List>
  );
}

export default StarRatingView;
