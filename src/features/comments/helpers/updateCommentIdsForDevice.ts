import produce from 'immer';
import { IDevice } from '../../devices/types';

interface IProps {
  devices: Record<string, IDevice>;
  deviceId: number | string;
  ids: number[];
}

const updateCommentIdsForDevice = ({ devices, deviceId, ids }: IProps) => {
  return produce(devices, (draft: Record<string, IDevice>) => {
    const prevComments = draft[deviceId].comments as number[];

    if (prevComments !== undefined) {
      prevComments.push(...ids);
    } else {
      draft[deviceId].comments = ids;
    }
  });
};

export default updateCommentIdsForDevice;
