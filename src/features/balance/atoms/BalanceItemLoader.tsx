import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function BalanceItemLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={240}
      height={100}
      viewBox="0 0 240 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="240" height="100" />
    </ContentLoader>
  );
}

export default BalanceItemLoader;
