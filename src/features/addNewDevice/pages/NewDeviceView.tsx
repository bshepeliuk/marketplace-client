import React from 'react';
import HeaderView from '@common/components/Header/HeaderView';
import { Route, Routes } from 'react-router-dom';
import NotFoundView from '@src/features/notFound/NotFoundView';
import BrandStepView from './BrandStepView';
import CategoryStepView from './CategoryStepView';
import DeviceBaseInfoStepView from './DeviceBaseInfoStepView';
import DeviceFeatureStepView from './DeviceFeatureStepView';
import DeviceImagesStepView from './DeviceImagesStepView';
import { Wrap } from '../styles/deviceForm.styled';
import { NewDeviceProvider } from '../context/NewDeviceContext';
import StepIndicatorList from '../components/StepIndicatorList';

export const newDeviceRoutes = {
  brand: '/new',
  category: '/new/device-category',
  info: '/new/device-base-info',
  details: '/new/device-features',
  images: '/new/device-images',
};

function NewDeviceView() {
  return (
    <>
      <HeaderView />

      <Wrap>
        <NewDeviceProvider>
          <StepIndicatorList />

          <Routes>
            <Route path="/" element={<BrandStepView />} />
            <Route path="device-category" element={<CategoryStepView />} />
            <Route
              path="device-base-info"
              element={<DeviceBaseInfoStepView />}
            />
            <Route path="device-features" element={<DeviceFeatureStepView />} />
            <Route path="device-images" element={<DeviceImagesStepView />} />

            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </NewDeviceProvider>
      </Wrap>
    </>
  );
}

export default NewDeviceView;
