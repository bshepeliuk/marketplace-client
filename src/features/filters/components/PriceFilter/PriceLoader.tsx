import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function PriceLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={362}
      height={160}
      viewBox="0 0 362 160"
      backgroundColor="#f1efef"
      foregroundColor="#ebeaea"
      {...props}
    >
      <rect x="0" y="-1" rx="2" ry="2" width="362" height="38" />
      <rect x="0" y="68" rx="2" ry="2" width="120" height="30" />
      <rect x="130" y="68" rx="2" ry="2" width="120" height="30" />
      <rect x="0" y="130" rx="2" ry="2" width="312" height="5" />
      <rect x="0" y="125" rx="100" ry="100" width="15" height="15" />
      <rect x="302" y="125" rx="100" ry="100" width="15" height="15" />
    </ContentLoader>
  );
}

export default PriceLoader;
