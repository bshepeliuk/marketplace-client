import React from 'react';

import useNewDeviceContext from '../hooks/useNewDeviceContext';
import {
  DeleteIcon,
  Description,
  HeaderItem,
  HeaderListItem,
  List,
  Title,
  ListItem,
} from '../styles/featureList.styled';

function DeviceFeatureList() {
  const { formState, deleteFeatureDetails } = useNewDeviceContext();

  const hasNoItems = formState.features.length === 0;

  if (hasNoItems) return null;

  return (
    <List className="custom-scrollbar">
      <HeaderListItem>
        <HeaderItem>Feature</HeaderItem>
        <HeaderItem>Description</HeaderItem>
        <HeaderItem>Action</HeaderItem>
      </HeaderListItem>

      {formState.features.map((item) => (
        <ListItem key={item.title + item.description}>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <DeleteIcon
            type="button"
            id="delete-feature-btn"
            onClick={() => deleteFeatureDetails(item)}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default DeviceFeatureList;
