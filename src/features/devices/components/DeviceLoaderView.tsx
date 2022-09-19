import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function DeviceLoaderView(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={255}
      height={363}
      viewBox="0 0 255 363"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="253" height="250" />
      <rect x="0" y="261" rx="2" ry="2" width="253" height="18" />
      <rect x="0" y="290" rx="2" ry="2" width="80" height="20" />
      <rect x="233" y="289" rx="2" ry="2" width="20" height="20" />
      <rect x="85" y="290" rx="2" ry="2" width="20" height="20" />
      <rect x="208" y="320" rx="2" ry="2" width="45" height="45" />
      <rect x="0" y="336" rx="2" ry="2" width="120" height="20" />
    </ContentLoader>
  );
}

export default DeviceLoaderView;
