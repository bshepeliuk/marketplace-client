import React, { ChangeEvent, useEffect, useState } from 'react';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { newDeviceRoutes } from '../../pages/NewDeviceView';
import {
  FormFooter,
  FormWrap,
  PreviewImage,
  PreviewList,
  PreviewListItem,
  PrevLink,
  SaveButton,
} from '../../styles/deviceForm.styled';

function DeviceImagesStepView() {
  const context = useNewDeviceContext();

  return (
    <FormWrap>
      <ImageFileInput />
      <FormFooter>
        <PrevLink to={newDeviceRoutes.details}>Prev</PrevLink>
        <SaveButton type="button" onClick={context.save}>
          Save
        </SaveButton>
      </FormFooter>

      <DeviceImagesPreview />
    </FormWrap>
  );
}

function ImageFileInput() {
  const context = useNewDeviceContext();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.currentTarget;

    if (files === null) return;

    const MAX_FILES_LENGTH = 5;

    if (files && files.length > MAX_FILES_LENGTH) {
      // TODO: max 5, show notification or error.
      return;
    }

    for (const file of Array.from(files)) {
      context.addImage(file);
    }
  };

  return <input type="file" onChange={onChange} accept="image/*" multiple />;
}

const useGetImgURLsByFiles = (files: File[]) => {
  const [imageDataURLs, setImageDataURLs] = useState<string[]>([]);

  useEffect(() => {
    const images: string[] = [];
    const fileReaders: FileReader[] = [];

    let isCancel = false;

    if (files.length > 0) {
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

function DeviceImagesPreview() {
  const { formState } = useNewDeviceContext();
  const imageDataURLs = useGetImgURLsByFiles(formState.images);

  const hasImgURLs = imageDataURLs.length > 0;

  return hasImgURLs ? (
    <PreviewList>
      {imageDataURLs.map((dataUrl, idx) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <PreviewImageItem key={idx} dataUrl={dataUrl} />
        );
      })}
    </PreviewList>
  ) : null;
}

function PreviewImageItem({ dataUrl }: { dataUrl: string }) {
  return (
    <PreviewListItem>
      <PreviewImage src={dataUrl} alt="preview" />
    </PreviewListItem>
  );
}

export default DeviceImagesStepView;
