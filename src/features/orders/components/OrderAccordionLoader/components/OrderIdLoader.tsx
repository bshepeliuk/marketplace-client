import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function OrderIdLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={100}
      height={84}
      viewBox="0 0 100 84"
      backgroundColor="#f5f5f5"
      foregroundColor="#e6e6e6"
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width={100} height="84" />
    </ContentLoader>
  );
}

export default OrderIdLoader;
