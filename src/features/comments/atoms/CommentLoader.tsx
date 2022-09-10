import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function CommentLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={115}
      viewBox="0 0 400 115"
      backgroundColor="#f1efef"
      foregroundColor="#ebeaea"
      {...props}
    >
      <rect x="56" y="0" rx="2" ry="2" width="134" height="21" />
      <rect x="56" y="30" rx="2" ry="2" width="350" height="30" />
      <rect x="280" y="0" rx="2" ry="2" width="120" height="20" />
      <rect x="0" y="0" rx="100" ry="100" width="50" height="50" />
      <rect x="87" y="69" rx="10" ry="10" width="120" height="20" />
      <rect x="239" y="69" rx="2" ry="2" width="43" height="16" />
      <rect x="297" y="69" rx="2" ry="2" width="43" height="16" />
      <rect x="355" y="69" rx="2" ry="2" width="43" height="16" />
    </ContentLoader>
  );
}

export default CommentLoader;
