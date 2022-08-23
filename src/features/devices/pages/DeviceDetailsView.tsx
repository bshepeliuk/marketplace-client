import React from 'react';
import { useParams, Route, Routes } from 'react-router-dom';
import { Container } from '@common/styles/base.styled';
import useSlowDownLoaderIndicator from '@common/hooks/useSlowDownLoaderIndicator';
// eslint-disable-next-line max-len
import useAddToRecentlyViewed from '@features/recentlyViewed/hooks/useAddToRecentlyViewed';
import useGetDeviceById from '../hooks/useGetDeviceById';
import { BackBtn, InnerWrap, Title } from '../styles/deviceDetails.styled';
import LoadingDeviceDetailsView from '../components/LoadingDeviceDetailsView';
import NotFoundDeviceView from '../components/NotFoundDeviceView';
import useGoTo from '../hooks/useGoTo';
import DeviceCommentsView from '../components/DeviceCommentsView';
import DeviceOverView from '../components/DeviceOverView';
import calculateAvgRating from '../helpers/calculateAvgRating';
import AvgRatingView from '../components/AvgRatingView';
import DeviceNavigation from '../components/DeviceNavigation';

function DeviceDetailsView() {
  const { deviceId } = useParams();
  const { goBack } = useGoTo();
  // prettier-ignore
  const {
    device,
    isLoading,
    hasNoDevice,
    hasNoFound
  } = useGetDeviceById(Number(deviceId));
  const isLoadingSlow = useSlowDownLoaderIndicator({
    isLoading,
    duration: 1000,
  });
  useAddToRecentlyViewed({ device, viewedAt: new Date() });

  const ratings = device?.ratings ?? [];
  const avgRating = calculateAvgRating(ratings);

  if (isLoadingSlow) return <LoadingDeviceDetailsView />;

  if (hasNoDevice && !isLoadingSlow && hasNoFound) {
    return <NotFoundDeviceView />;
  }

  if (!device) return null;

  return (
    <Container>
      <InnerWrap>
        <BackBtn id="back-btn" onClick={goBack} />

        <Title>{device.name}</Title>

        <AvgRatingView avgRating={avgRating} amount={ratings.length} />

        <DeviceNavigation deviceId={device.id} />

        <Routes>
          <Route path="/" element={<DeviceOverView device={device} />} />
          <Route
            path="/comments"
            element={<DeviceCommentsView device={device} />}
          />
          <Route path="*" element={<div>Not Found....</div>} />
        </Routes>
      </InnerWrap>
    </Container>
  );
}

export default DeviceDetailsView;
