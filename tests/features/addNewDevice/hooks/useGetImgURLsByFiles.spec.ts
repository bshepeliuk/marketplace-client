import { renderHook, act } from '@testing-library/react-hooks';
import useGetImgURLsByFiles from '@common/hooks/useGetImgURLsByFiles';
import { waitFor } from '@testing-library/dom';
import FileReaderMock from '../../../helpers/FileReaderMock';

const fileReader = new FileReaderMock();

jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);

describe('[HOOK]: useGetImgURLsByFiles', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should save url for each file.', async () => {
    const files = [
      { id: 'file_0.jpg', file: new File([new ArrayBuffer(1)], 'file_0.jpg') },
      { id: 'file_1.jpg', file: new File([new ArrayBuffer(2)], 'file_1.jpg') },
      { id: 'file_2.jpg', file: new File([new ArrayBuffer(3)], 'file_2.jpg') },
    ];

    const { result } = renderHook(() => useGetImgURLsByFiles(files));

    act(() => {
      for (let i = 0; i < files.length; i += 1) {
        fileReader.onload({
          target: { result: 'data:image/jpeg;base64,/9j/4AAQSkZJRg1' },
        });
      }
    });

    expect(fileReader.readAsDataURL).toBeCalledTimes(files.length);

    await waitFor(() => {
      expect(Array.isArray(result.current)).toBeTruthy();
      expect(result.current).toHaveLength(files.length);
    });
  });

  test('should return empty array, when files was not passed', async () => {
    const files: { id: string; file: File }[] = [];

    const { result } = renderHook(() => useGetImgURLsByFiles(files));

    act(() => {
      fileReader.onload({
        target: { result: 'data:image/jpeg;base64,/9j/4AAQSkZJRg1' },
      });
    });

    expect(fileReader.readAsDataURL).not.toBeCalled();

    await waitFor(() => {
      expect(Array.isArray(result.current)).toBeTruthy();
      expect(result.current).toHaveLength(0);
    });
  });
});
