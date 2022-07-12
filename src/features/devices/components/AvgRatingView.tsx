import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { CurrentRating, RatingValue } from '../styles/deviceDetails.styled';

interface IProps {
  avgRating: number;
}

function AvgRatingView({ avgRating }: IProps) {
  return (
    <CurrentRating>
      <AiFillStar color="#fff200" size="2em" />
      <RatingValue>{avgRating}</RatingValue>
    </CurrentRating>
  );
}

export default AvgRatingView;
