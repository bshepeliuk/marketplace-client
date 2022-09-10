import React from 'react';
import ContentLoader, { IContentLoaderProps } from 'react-content-loader';
import { List, ListItem, Wrap } from '../../styles/categoriesList.styled';

function CategoriesListLoader() {
  const loaderItems = Array(10).fill(undefined);

  return (
    <Wrap>
      <List>
        {loaderItems.map((_, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={idx}>
            <Loader />
          </ListItem>
        ))}
      </List>
    </Wrap>
  );
}

function Loader(props: IContentLoaderProps) {
  return (
    <ContentLoader
      speed={2}
      width={93}
      height={37}
      viewBox="0 0 93 37"
      backgroundColor="#f1efef"
      foregroundColor="#ebeaea"
      {...props}
    >
      <rect x="0" y="0" rx="2" ry="2" width="93" height="37" />
    </ContentLoader>
  );
}

export default CategoriesListLoader;
