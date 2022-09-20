import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function LoaderForMobiles({ props }: { props: IContentLoaderProps }) {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={80}
      viewBox="0 0 300 80"
      backgroundColor="#f1efef"
      foregroundColor="#ebeaea"
      {...props}
    >
      <rect x="60" y="5" rx="2" ry="2" width="120" height="18" />
      <rect x="218" y="5" rx="2" ry="2" width="80" height="18" />
      <rect x="267" y="62" rx="2" ry="2" width="30" height="16" />
      <rect x="0" y="0" rx="100" ry="100" width="50" height="50" />
      <rect x="58" y="30" rx="2" ry="2" width="240" height="20" />
      <rect x="83" y="60" rx="14" ry="14" width="80" height="20" />
      <rect x="225" y="62" rx="2" ry="2" width="30" height="16" />
      <rect x="185" y="62" rx="2" ry="2" width="30" height="16" />
    </ContentLoader>
  );
}

export default LoaderForMobiles;
