import useAddToComparison from '@src/features/comparison/hooks/useAddToComparison';
import useCheckComparison from '@src/features/comparison/hooks/useCheckComparison';
import useDeleteFromComparison from '@src/features/comparison/hooks/useDeleteFromComparison';
import useCheckUserRole from '@src/common/hooks/useCheckUserRole';
import notifications from '@src/common/utils/notifications';
import { BalanceScaleIcon } from '../styles/deviceItem.styled';
import { IDevice } from '../types';

interface IProps {
  device: IDevice;
}

function ComparisonButton({ device }: IProps) {
  const { addToComparison } = useAddToComparison();
  const { deleteById } = useDeleteFromComparison();
  const { isUnique } = useCheckComparison();
  const { isSeller } = useCheckUserRole();

  const isUniqueDevice = isUnique(device);

  const handleComparison = () => {
    if (isSeller) {
      notifications.info('Kindly use an account with BUYER role.');
      return;
    }

    if (isUniqueDevice) {
      addToComparison(device);
    } else {
      deleteById(device.id);
    }
  };

  return <BalanceScaleIcon data-button="comparison" isUnique={isUniqueDevice} onClick={handleComparison} />;
}

export default ComparisonButton;
