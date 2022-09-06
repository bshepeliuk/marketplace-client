import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function PriceLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={362}
      height={155}
      viewBox="0 0 362 155"
      backgroundColor="#f1efef"
      foregroundColor="#ebeaea"
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="362" height="40" />
      <rect x="0" y="60" rx="2" ry="2" width="120" height="30" />
      <rect x="136" y="60" rx="2" ry="2" width="120" height="30" />
      <rect x="0" y="115" rx="2" ry="2" width="344" height="5" />
      <rect x="0" y="110" rx="100" ry="100" width="15" height="15" />
      <rect x="337" y="110" rx="100" ry="100" width="15" height="15" />
    </ContentLoader>
  );
}

export default PriceLoader;
