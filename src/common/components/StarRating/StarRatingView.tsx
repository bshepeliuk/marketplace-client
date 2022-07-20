/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';
import { BackStar, FrontStar, StarWrap, Wrap } from './rating.styled';

interface IRatingProps {
  initRating?: number;
  totalStars: number;
  size: number;
  precision?: number;
  isInteractive?: boolean;
  filledSVGIcon?: IconType;
  emptySVGIcon?: IconType;
  onChange?: (rating: number) => void;
}

function StarRating(props: IRatingProps) {
  const {
    initRating = 0,
    precision = 1,
    totalStars = 5,
    size = 20,
    isInteractive = true,
    filledSVGIcon = AiFillStar,
    emptySVGIcon = AiOutlineStar,
    onChange,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [rating, setRating] = useState(initRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const onClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    const selectedRating = calculateRating(evt);

    setRating(selectedRating);

    if (onChange !== undefined) onChange(selectedRating);
  };

  const onMouseOver = (evt: React.MouseEvent<HTMLDivElement>) => {
    setIsHover(true);
    setHoveredRating(calculateRating(evt));
  };

  const onMouseMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    setHoveredRating(calculateRating(evt));
  };

  const onMouseLeave = () => {
    setIsHover(false);
    setHoveredRating(0);
  };

  const calculateRating = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current === null) return 0;

    const { width, left } = containerRef.current.getBoundingClientRect();

    const positionX = (evt.clientX - left) / width;

    const numberInStars = positionX * totalStars;
    // prettier-ignore
    const nearestNumber = Math.round((numberInStars + precision) / precision) * precision;

    return Number(nearestNumber.toFixed(2));
  };

  const isMarked = (id: number) => {
    return hoveredRating ? hoveredRating >= id + 1 : rating >= id + 1;
  };

  const starsArray = [...Array(props.totalStars)];

  return (
    <Wrap
      isInteractive={isInteractive}
      ref={containerRef}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={onClick}
      size={size}
    >
      {starsArray.map((_, idx) => {
        const currentRating = isHover ? hoveredRating : rating;

        const isActiveRating = currentRating !== 0;
        const isRatingWithPrecision = currentRating % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(currentRating) === idx + 1;
        // prettier-ignore
        const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        const widthInPercent = showRatingWithPrecision
          ? (currentRating % 1) * 100
          : 0;

        const key = `star-${idx}`;

        return (
          <Star
            key={key}
            starId={idx + 1}
            marked={isMarked(idx)}
            widthInPercent={widthInPercent}
            filledIcon={filledSVGIcon}
            emptyIcon={emptySVGIcon}
          />
        );
      })}
    </Wrap>
  );
}

interface IStarProps {
  marked: boolean;
  widthInPercent: number;
  filledIcon: IconType;
  emptyIcon: IconType;
  starId: number;
}

function Star(props: IStarProps) {
  const {
    marked,
    starId,
    widthInPercent,
    filledIcon: Filled,
    emptyIcon: Empty,
  } = props;

  return (
    <StarWrap data-star-id={starId}>
      <FrontStar marked={marked}>
        {marked ? (
          <Filled data-star-state="filled" />
        ) : (
          <Empty data-star-state="empty" />
        )}
      </FrontStar>

      <BackStar widthInPercent={widthInPercent}>
        <Filled />
      </BackStar>
    </StarWrap>
  );
}

export default StarRating;
