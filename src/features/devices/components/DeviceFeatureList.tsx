import React from 'react';
import {
  FeatureDescription,
  FeatureTitle,
  InfoItem,
  InfoList,
} from '../styles/deviceDetails.styled';
import { IDeviceInfo } from '../types';

interface IProps {
  features: IDeviceInfo[];
}

function DeviceFeatureList({ features }: IProps) {
  return (
    <InfoList>
      {features.map((item) => {
        return (
          <InfoItem key={item.id}>
            <FeatureTitle>{item.title}:</FeatureTitle>
            <FeatureDescription>{item.description}</FeatureDescription>
          </InfoItem>
        );
      })}
    </InfoList>
  );
}

export default DeviceFeatureList;
