import React from 'react';
import useNewDeviceContext from '../hooks/useNewDeviceContext';

function DeviceFeatureList() {
  const { formState, deleteFeatureDetails } = useNewDeviceContext();

  return (
    <ul>
      {formState.features.map((item) => (
        <li key={item.title + item.description}>
          {item.title}: {item.description}
          <button type="button" onClick={() => deleteFeatureDetails(item)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DeviceFeatureList;
