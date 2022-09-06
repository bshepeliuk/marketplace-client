import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';

function AccordionLoader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={362}
      height={180}
      viewBox="0 0 362 180"
      backgroundColor="#f1efef"
      foregroundColor="#ebeaea"
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="362" height="40" />
      <rect x="0" y="60" rx="2" ry="2" width="18" height="18" />
      <rect x="38" y="60" rx="2" ry="2" width="150" height="18" />
      <rect x="0" y="90" rx="2" ry="2" width="18" height="18" />
      <rect x="0" y="120" rx="2" ry="2" width="18" height="18" />
      <rect x="0" y="150" rx="2" ry="2" width="18" height="18" />
      <rect x="38" y="90" rx="2" ry="2" width="135" height="18" />
      <rect x="38" y="120" rx="2" ry="2" width="120" height="18" />
      <rect x="38" y="150" rx="2" ry="2" width="130" height="18" />
    </ContentLoader>
  );
}

export default AccordionLoader;
