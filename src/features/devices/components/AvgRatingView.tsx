import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import {
  CurrentRating,
  RatingAmount,
  RatingValue,
} from '../styles/deviceDetails.styled';

interface IProps {
  avgRating: number;
  amount: number;
}

function AvgRatingView({ avgRating, amount }: IProps) {
  return (
    <CurrentRating>
      <AiFillStar color="#fff200" size="2em" />
      <RatingValue>{avgRating}</RatingValue>
      <RatingAmount>{`(${amount})`}</RatingAmount>
    </CurrentRating>
  );
}

export default AvgRatingView;
