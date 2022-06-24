import React, { useRef } from 'react';
import useGetImgURLsByFiles from '@src/common/hooks/useGetImgURLsByFiles';
import useHandleScrollBySideBtnClick from '@common/hooks/useHandleScrollBySideBtnClick';

import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import {
  LeftArrow,
  LeftArrowWrap,
  PreviewList,
  RightArrow,
  RightArrowWrap,
  Wrap,
} from '../../styles/deviceForm.styled';
import PreviewImageItem from './PreviewImageItem';

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
        {imageDataURLs.map((img) => (
          // eslint-disable-next-line react/no-array-index-key
          <PreviewImageItem key={img.id} image={img} />
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

export default DeviceImagesPreview;
