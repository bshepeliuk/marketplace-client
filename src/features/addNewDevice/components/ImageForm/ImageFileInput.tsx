import React, { ChangeEvent } from 'react';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { FileInputLabel, UploadIcon } from '../../styles/deviceForm.styled';

const MAX_FILES_LENGTH = 5;

function ImageFileInput() {
  const context = useNewDeviceContext();

  const { images } = context.formState;

  const isDisabled = images.length === MAX_FILES_LENGTH;
  const hasSelectedImages = images.length > 0;

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.currentTarget;

    if (files === null) return;

    if (files && files.length > MAX_FILES_LENGTH) {
      // TODO: max 5, show notification or error.
      return;
    }

    for (const file of Array.from(files)) {
      context.addImage(file);
    }
  };

  return (
    <div>
      <FileInputLabel htmlFor="device-images" isDisabled={isDisabled}>
        <UploadIcon />
        {hasSelectedImages ? `${images.length} selected files` : 'choose files'}
        <input
          id="device-images"
          type="file"
          onChange={onChange}
          accept="image/*"
          multiple
          hidden
          disabled={isDisabled}
        />
      </FileInputLabel>
    </div>
  );
}

export default ImageFileInput;
