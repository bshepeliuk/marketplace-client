import React from 'react';
import { BackStar, FrontStar, StarWrap, Wrap } from './rating.styled';

interface IRatingProps {
  initRating?: number;
  totalStars: number;
  size: number;
  precision?: number;
}

function StarRating(props: IRatingProps) {
  const { initRating = 0, precision = 1, totalStars = 5 } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [rating, setRating] = React.useState(initRating);
  const [selection, setSelection] = React.useState(0);
  const [isHover, setIsHover] = React.useState(false);

  const onClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    setRating(calculateRating(evt));
  };

  const calculateRating = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current === null) return 0;

    const { width, left } = containerRef.current.getBoundingClientRect();

    const positionX = (evt.clientX - left) / width;

    const numberInStars = positionX * totalStars;

    const nearestNumber =
      Math.round((numberInStars + precision) / precision) * precision;

    return Number(
      nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0),
    );
  };

  const onMouseOver = (evt: React.MouseEvent<HTMLDivElement>) => {
    setIsHover(true);
    setSelection(calculateRating(evt));
  };

  const onMouseMove = (evt: React.MouseEvent<HTMLDivElement>) => {
    setSelection(calculateRating(evt));
  };

  const onMouseLeave = () => {
    setIsHover(false);
    setSelection(0);
  };

  const isMarked = (id: number) => {
    return selection ? selection >= id + 1 : rating >= id + 1;
  };

  return (
    <Wrap
      ref={containerRef}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={onClick}
      size={props.size}
    >
      {[...Array(props.totalStars)].map((_, idx) => {
        const currentRating = isHover ? selection : rating;

        const isActiveRating = currentRating !== 1;
        const isRatingWithPrecision = currentRating % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(currentRating) === idx + 1;

        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        const widthInPercent = showRatingWithPrecision
          ? (currentRating % 1) * 100
          : 0;

        const key = `star-${idx}`;

        return (
          <Star
            key={key}
            marked={isMarked(idx)}
            widthInPercent={widthInPercent}
          />
        );
      })}
    </Wrap>
  );
}

interface IStarProps {
  marked: boolean;
  widthInPercent: number;
}

function Star({ marked, widthInPercent }: IStarProps) {
  return (
    <StarWrap>
      <FrontStar marked={marked}>{marked ? '\u2605' : '\u2606'}</FrontStar>
      <BackStar widthInPercent={widthInPercent}>{'\u2605'}</BackStar>
    </StarWrap>
  );
}

export default StarRating;
