import React, { useRef } from 'react';
import StarRating from '@common/components/StarRating/StarRatingView';
import CommentForm from '@features/comments/components/CommentForm';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import CommentsList from '@features/comments/components/CommentsList';
import useAddComment from '@features/comments/hooks/useAddComment';
import useContainerDimensions from '@common/hooks/useContainerDimensions';
import { CommentsProvider } from '@features/comments/context/CommentsContext';
import calculateAvgRating from '../helpers/calculateAvgRating';
import useEvaluateDevice from '../hooks/useEvaluateDevice';
import { IDevice, IDeviceRating } from '../types';
import { CommentFormContainer, CommentsWrap, RatingMessage } from '../styles/deviceDetails.styled';

interface IProps {
  device: IDevice;
}

function DeviceCommentsView({ device }: IProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { size } = useContainerDimensions(containerRef);
  const { evaluate, isEvaluating } = useEvaluateDevice();
  const { onAdd } = useAddComment();
  const { user, isLoggedIn } = useTypedSelector((state) => state.auth);

  const ratings = device.ratings as IDeviceRating[];
  const avgRating = calculateAvgRating(ratings);

  const hasRated = ratings.every((item) => item.userId !== user?.id);

  const onChangeRating = (rating: number) => {
    evaluate({ rating, deviceId: device.id });
  };

  const onAddComment = (body: string) => {
    onAdd({ body, parentId: null, deviceId: device.id });
  };

  return (
    <CommentsWrap ref={containerRef}>
      <CommentsProvider>
        <CommentsList size={size} />
      </CommentsProvider>

      <CommentFormContainer>
        <CommentForm handleSubmit={onAddComment} />
        <StarRating
          totalStars={5}
          size={40}
          precision={0.5}
          initRating={avgRating}
          onChange={onChangeRating}
          isInteractive={hasRated && isLoggedIn && !isEvaluating}
        />

        {!hasRated && isLoggedIn && <RatingMessage>* You have already evaluated this device.</RatingMessage>}
      </CommentFormContainer>
    </CommentsWrap>
  );
}

export default DeviceCommentsView;
