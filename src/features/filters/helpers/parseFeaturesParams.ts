type IFeatures = Array<string[]>;

const parseFeaturesParams = (features: IFeatures) => {
  return features.reduce((acc, current) => {
    const [key, value] = current;

    if (key === 'features') return [...acc, deserialize(value)];

    return [...acc, current];
  }, [] as IFeatures);
};

const deserialize = (feature: string): string[] => feature.split(':');

export default parseFeaturesParams;
