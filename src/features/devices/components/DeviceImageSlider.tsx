import React from 'react';
import useSlider from '@src/common/hooks/useSlider';
import useZoomImageOnMouseEvt from '@common/hooks/useZoomImageOnMouseEvt';
import styled from 'styled-components';

import {
  DotImage,
  DotsList,
  LeftArrow,
  RightArrow,
  SliderImage,
  SliderWrap,
  InnerWrapper,
} from '../styles/deviceSlider.styled';

interface ISliderProps {
  urls: string[];
  alt?: string;
}

function DeviceImageSlider(props: ISliderProps) {
  const { urls = [], alt = 'device' } = props;
  // prettier-ignore
  const {
    activeIdx,
    setActiveIdx,
    onLeftClick,
    onRightClick,
    slideDirection
  } = useSlider({ startIdx: 0, lastIdx: urls.length - 1 , delay: 590 });
  const {
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    imgRef,
    lensRef,
    lensOutputRef,
    isLensActive,
  } = useZoomImageOnMouseEvt();

  const greaterThanOne = urls.length > 1;

  return (
    <>
      {isLensActive && <LensOutput ref={lensOutputRef} />}

      <SliderWrap>
        <InnerWrapper>
          {greaterThanOne && <LeftArrow onClick={onLeftClick}>left</LeftArrow>}

          <Wrap>
            <SliderImage
              ref={imgRef}
              key={urls[activeIdx]}
              src={urls[activeIdx]}
              alt={alt}
              slideDirection={slideDirection}
              onMouseMove={onMouseMove}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />

            {isLensActive && <Lens ref={lensRef} />}
          </Wrap>

          {greaterThanOne && (
            <RightArrow onClick={onRightClick}>right</RightArrow>
          )}
        </InnerWrapper>

        {greaterThanOne && (
          <DotImageList
            urls={urls}
            onClick={(idx) => setActiveIdx(idx)}
            alt={alt}
          />
        )}
      </SliderWrap>
    </>
  );
}

interface IDotImgList {
  urls: string[];
  alt: string;
  onClick: (idx: number) => void;
}

function DotImageList({ urls, alt, onClick }: IDotImgList) {
  return (
    <DotsList className="custom-scrollbar-horizontal">
      {urls.map((url, idx) => (
        <DotImage key={url} src={url} alt={alt} onClick={() => onClick(idx)} />
      ))}
    </DotsList>
  );
}

export const Wrap = styled.div`
  position: relative;
  height: 100%;
`;

export const Lens = styled.div`
  border: 1px solid rgba(52, 73, 94, 1);
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  border-radius: 4px;
  background-color: rgba(189, 195, 199, 0.5);
  pointer-events: none;
`;

export const LensOutput = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  width: 400px;
  height: 300px;
  grid-column: 3;
  grid-row: 3 / 5;
  z-index: 20;
  justify-self: center;
  border-radius: 4px;
`;

export default DeviceImageSlider;
