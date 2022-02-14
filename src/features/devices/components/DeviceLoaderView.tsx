import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function DeviceLoaderView(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={285}
      height={400}
      viewBox="0 0 285 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="266" rx="2" ry="2" width="285" height="35" />
      <rect x="197" y="324" rx="2" ry="2" width="84" height="52" />
      <rect x="0" y="2" rx="4" ry="4" width="285" height="240" />
      <rect x="5" y="328" rx="2" ry="2" width="153" height="28" />
    </ContentLoader>
  );
}

export default DeviceLoaderView;
