/* eslint-disable max-len */
import updateCommentIdsForDevice from '@features/comments/helpers/updateCommentIdsForDevice';
import { deviceEntityMock } from '../../../mocks/entitiesMock';
import { deviceMock } from '../../../mocks/data';

describe('[HELPERS]: updateCommentIdsForDevice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should update comments field and return a new object.', () => {
    const newCommentIds = [1000, 1001, 1002];
    const deviceId = deviceMock.id;

    const deviceWithUpdatedCommentsIds = updateCommentIdsForDevice({
      deviceId,
      devices: deviceEntityMock.entities.devices,
      ids: newCommentIds,
    });

    const prevComments = deviceEntityMock.entities.devices[deviceId].comments;
    const nextComments = deviceWithUpdatedCommentsIds[deviceId].comments;

    expect(nextComments).toEqual([...prevComments, ...newCommentIds]);
  });

  test('in case device does not have comments field, should attach this key to the incoming object and return a new object.', () => {
    const newCommentIds = [1, 2, 3];
    const deviceId = deviceMock.id;

    const deviceWithUpdatedCommentsIds = updateCommentIdsForDevice({
      deviceId,
      devices: {
        ...deviceEntityMock.entities.devices,
        [deviceId]: {
          ...deviceEntityMock.entities.devices[deviceId],
          comments: undefined,
        },
      },
      ids: newCommentIds,
    });

    expect(deviceWithUpdatedCommentsIds[deviceId].comments).toEqual(
      newCommentIds,
    );
  });
});
