import React from 'react';
import StarRating from '@common/components/StarRating/StarRatingView';
import { useTypedSelector } from '@src/common/hooks/useTypedSelector';
import calculateAvgRating from '../helpers/calculateAvgRating';
import useEvaluateDevice from '../hooks/useEvaluateDevice';
import { IDevice, IDeviceRating } from '../types';
import { TabsContent } from '../styles/deviceDetails.styled';

interface IProps {
  device: IDevice;
}

function DeviceCommentsView({ device }: IProps) {
  const { evaluate, isEvaluating } = useEvaluateDevice();
  const { user, isLoggedIn } = useTypedSelector((state) => state.auth);

  const ratings = device.ratings as IDeviceRating[];
  const avgRating = calculateAvgRating(ratings);

  const hasRated = ratings.every((item) => item.userId !== user?.id);

  const onChangeRating = (rating: number) => {
    evaluate({ rating, deviceId: device.id });
  };

  return (
    <TabsContent>
      <StarRating
        totalStars={5}
        size={40}
        precision={0.5}
        initRating={avgRating}
        onChange={onChangeRating}
        isInteractive={hasRated && isLoggedIn && !isEvaluating}
      />
    </TabsContent>
  );
}

export default DeviceCommentsView;
