import React from 'react';
import { useParams, Route, Routes, generatePath } from 'react-router-dom';
import HeaderView from '@common/components/Header/HeaderView';
import { Container } from '@common/styles/base.styled';
// eslint-disable-next-line max-len
import useSlowDownLoaderIndicator from '@common/hooks/useSlowDownLoaderIndicator';
import { routes } from '@src/app/Router';
import useGetDeviceById from '../hooks/useGetDeviceById';
import {
  BackBtn,
  InnerWrap,
  TabsWrap,
  Title,
  TabLink,
} from '../styles/deviceDetails.styled';
import LoadingDeviceDetailsView from '../components/LoadingDeviceDetailsView';
import NotFoundDeviceView from '../components/NotFoundDeviceView';
import useGoTo from '../hooks/useGoTo';

import DeviceCommentsView from '../components/DeviceCommentsView';
import DeviceOverView from '../components/DeviceOverView';

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

  if (isLoadingSlow) return <LoadingDeviceDetailsView />;

  if (hasNoDevice && !isLoadingSlow && hasNoFound) {
    return <NotFoundDeviceView />;
  }

  if (!device) return null;

  return (
    <>
      <HeaderView />

      <Container>
        <InnerWrap>
          <BackBtn id="back-btn" onClick={goBack} />

          <Title>{device.name}</Title>

          <DeviceTabsHeader deviceId={device.id} />

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
    </>
  );
}

function DeviceTabsHeader({ deviceId }: { deviceId: number }) {
  return (
    <TabsWrap>
      <TabLink
        end
        to={generatePath(routes.device, { deviceId: String(deviceId) })}
      >
        Overview
      </TabLink>
      <TabLink
        className={({ isActive }) => (isActive ? 'active' : undefined)}
        to={generatePath(routes.deviceWithEntity, {
          deviceId: String(deviceId),
          entity: 'comments',
        })}
      >
        Rating & Comments
      </TabLink>
    </TabsWrap>
  );
}

export default DeviceDetailsView;
