/* eslint-disable max-len */
import calculateCommentListWidthBySize from '@features/comments/helpers/calculateCommentListWidthBySize';

describe('[HELPERS]: calculateCommentListWidthBySize', () => {
  const CURRENT_WIDTH = {
    LG: 530,
    SM: 450,
    XS: 440,
  };

  const CONTAINER_WIDTH = {
    LG: 500,
    SM: 400,
    XS: 320,
  };

  test('should have 500px width for devices with large screen.', () => {
    const width = calculateCommentListWidthBySize({ width: CURRENT_WIDTH.LG });
    expect(CONTAINER_WIDTH.LG).toBe(width);
  });

  test('should have 400px width for devices with small screen.', () => {
    const width = calculateCommentListWidthBySize({ width: CURRENT_WIDTH.SM });
    expect(CONTAINER_WIDTH.SM).toBe(width);
  });

  test('should have 320px width for devices with extra small screen.', () => {
    const width = calculateCommentListWidthBySize({ width: CURRENT_WIDTH.XS });
    expect(CONTAINER_WIDTH.XS).toBe(width);
  });
});
