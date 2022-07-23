import React from 'react';
import StarRating from '@common/components/StarRating/StarRatingView';
import CommentForm from '@features/comments/components/CommentForm';
import { IComment, OnAddCommentType } from '@features/comments/types';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import CommentsList from '@features/comments/components/CommentsList';
import useAddComment from '@features/comments/hooks/useAddComment';
import calculateAvgRating from '../helpers/calculateAvgRating';
import useEvaluateDevice from '../hooks/useEvaluateDevice';
import { IDevice, IDeviceRating } from '../types';
import { CommentsWrap } from '../styles/deviceDetails.styled';

interface IProps {
  device: IDevice;
}

function DeviceCommentsView({ device }: IProps) {
  const { evaluate, isEvaluating } = useEvaluateDevice();
  const { onAdd } = useAddComment();
  const { user, isLoggedIn } = useTypedSelector((state) => state.auth);

  const ratings = device.ratings as IDeviceRating[];
  const comments = device.comments as IComment[];
  const avgRating = calculateAvgRating(ratings);

  const hasRated = ratings.every((item) => item.userId !== user?.id);

  const onChangeRating = (rating: number) => {
    evaluate({ rating, deviceId: device.id });
  };

  const onAddComment = ({ body, parentId }: OnAddCommentType) => {
    onAdd({ body, parentId, deviceId: device.id });
  };

  return (
    <CommentsWrap>
      <StarRating
        totalStars={5}
        size={40}
        precision={0.5}
        initRating={avgRating}
        onChange={onChangeRating}
        isInteractive={hasRated && isLoggedIn && !isEvaluating}
      />

      <CommentForm
        handleSubmit={(body) => onAddComment({ body, parentId: null })}
      />
      <CommentsList comments={comments} deviceId={device.id} />
    </CommentsWrap>
  );
}

export default DeviceCommentsView;
