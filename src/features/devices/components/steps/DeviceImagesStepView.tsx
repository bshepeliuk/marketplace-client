import useHandleScrollBySideBtnClick from '@common/hooks/useHandleScrollBySideBtnClick';
import useGetImgURLsByFiles from '@src/common/hooks/useGetImgURLsByFiles';
import React, { ChangeEvent, useRef } from 'react';

import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { newDeviceRoutes } from '../../pages/NewDeviceView';
import {
  DeleteImgButton,
  FormFooter,
  FormWrap,
  LeftArrow,
  LeftArrowWrap,
  PreviewImage,
  PreviewList,
  PreviewListItem,
  PrevLink,
  RightArrow,
  RightArrowWrap,
  SaveButton,
  Wrap,
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

  const MAX_FILES_LENGTH = 5;

  const isDisabled = context.formState.images.length === MAX_FILES_LENGTH;

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
    <input
      type="file"
      onChange={onChange}
      accept="image/*"
      multiple
      disabled={isDisabled}
    />
  );
}

function DeviceImagesPreview() {
  const scrollWrapRef = useRef(null);
  const { formState } = useNewDeviceContext();
  const imageDataURLs = useGetImgURLsByFiles(formState.images);
  // prettier-ignore
  const {
    onLeftClick,
    onRightClick,
    isLeftVisible,
    isRightVisible
   } = useHandleScrollBySideBtnClick(scrollWrapRef, imageDataURLs.length);

  const hasImgURLs = imageDataURLs.length > 0;

  if (!hasImgURLs) return null;

  return (
    <Wrap>
      {isLeftVisible && (
        <LeftArrowWrap>
          <LeftArrow onClick={onLeftClick} />
        </LeftArrowWrap>
      )}

      <PreviewList ref={scrollWrapRef}>
        {imageDataURLs.map((dataUrl, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <PreviewImageItem key={idx} dataUrl={dataUrl} />
        ))}
      </PreviewList>

      {isRightVisible && (
        <RightArrowWrap>
          <RightArrow onClick={onRightClick} />
        </RightArrowWrap>
      )}
    </Wrap>
  );
}

function PreviewImageItem({ dataUrl }: { dataUrl: string }) {
  const context = useNewDeviceContext();

  return (
    <PreviewListItem>
      <PreviewImage src={dataUrl} alt="preview" />
      <DeleteImgButton type="button" onClick={context.deleteImg}>
        delete
      </DeleteImgButton>
    </PreviewListItem>
  );
}

export default DeviceImagesStepView;
