import React, { useRef } from 'react';
import HeaderView from '@src/common/components/Header/HeaderView';
// eslint-disable-next-line max-len
import SideBarDeviceFilterView from '@features/filters/components/SideBarDeviceFilterView';
import DeviceListView from '../components/DeviceListView';
import { DeviceListContainer, Wrapper } from '../styles/deviceView.styled';

function DevicesView() {
  const containerRef = useRef<any>(null);

  return (
    <>
      <HeaderView />

      <Wrapper>
        <SideBarDeviceFilterView />

        <DeviceListContainer ref={containerRef}>
          <DeviceListView containerRef={containerRef} />
        </DeviceListContainer>
      </Wrapper>
    </>
  );
}

export default DevicesView;
