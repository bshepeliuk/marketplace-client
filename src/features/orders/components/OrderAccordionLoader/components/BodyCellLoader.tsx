import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function BodyCellLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={193}
      height={50}
      viewBox="0 0 193 50"
      backgroundColor="#f5f5f5"
      foregroundColor="#e6e6e6"
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="193" height="50" />
    </ContentLoader>
  );
}

export default BodyCellLoader;
