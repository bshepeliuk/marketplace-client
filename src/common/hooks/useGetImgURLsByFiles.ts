import { useEffect, useState } from 'react';

interface IImgUrls {
  id: string;
  url: string;
}

interface IFile {
  id: string;
  file: File;
}

const useGetImgURLsByFiles = (files: Array<IFile>) => {
  const [imageDataURLs, setImageDataURLs] = useState<Array<IImgUrls>>([]);

  useEffect(() => {
    if (files.length === 0) {
      setImageDataURLs([]);
      return;
    }

    const images: Array<IImgUrls> = [];
    const fileReaders: FileReader[] = [];

    let isCancel = false;

    files.forEach((item: { id: string; file: File }) => {
      const fileReader = new FileReader();

      fileReaders.push(fileReader);

      fileReader.onload = (evt) => {
        const { result } = evt.target as FileReader;

        if (typeof result === 'string') {
          images.push({ id: item.id, url: result });
        }

        if (images.length === files.length && !isCancel) {
          setImageDataURLs(images);
        }
      };

      fileReader.readAsDataURL(item.file);
    });

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
