import { useEffect, useState } from 'react';

const useGetImgURLsByFiles = (files: File[]) => {
  const [imageDataURLs, setImageDataURLs] = useState<string[]>([]);

  useEffect(() => {
    const images: string[] = [];
    const fileReaders: FileReader[] = [];

    let isCancel = false;

    const hasFiles = files.length > 0;

    if (hasFiles) {
      files.forEach((file: File) => {
        const fileReader = new FileReader();

        fileReaders.push(fileReader);

        fileReader.onload = (evt) => {
          const { result } = evt.target as FileReader;

          if (typeof result === 'string') images.push(result);

          if (images.length === files.length && !isCancel) {
            setImageDataURLs(images);
          }
        };

        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;

      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [files]);

  return imageDataURLs;
};

export default useGetImgURLsByFiles;
