import React from 'react';
import useAddToComparison from '@src/features/comparison/hooks/useAddToComparison';
import useCheckComparison from '@src/features/comparison/hooks/useCheckComparison';
import useDeleteFromComparison from '@src/features/comparison/hooks/useDeleteFromComparison';
import { BalanceScaleIcon } from '../styles/deviceItem.styled';
import { IDevice } from '../types';

interface IProps {
  device: IDevice;
}

function ComparisonButton({ device }: IProps) {
  const { addToComparison } = useAddToComparison();
  const { deleteById } = useDeleteFromComparison();
  const { isUnique } = useCheckComparison();

  const isUniqueDevice = isUnique(device);

  const handleComparison = () => {
    if (isUniqueDevice) {
      addToComparison(device);
    } else {
      deleteById(device.id);
    }
  };

  return <BalanceScaleIcon data-button="comparison" isUnique={isUniqueDevice} onClick={handleComparison} />;
}

export default ComparisonButton;
