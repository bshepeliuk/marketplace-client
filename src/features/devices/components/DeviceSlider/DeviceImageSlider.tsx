import React, { useRef } from 'react';
import useSlider from '@src/common/hooks/useSlider';
import useZoomImageOnMouseEvt from '@common/hooks/useZoomImageOnMouseEvt';
import {
  LeftArrow,
  RightArrow,
  SliderImage,
  SliderWrap,
  InnerWrapper,
  ImageMagnify,
  ImgWrap,
} from '../../styles/deviceSlider.styled';
import DotImageList from './DotImageList';
import { Lens, LensOutput } from '../../styles/lens.styled';

interface ISliderProps {
  urls: string[];
  alt?: string;
}

function DeviceImageSlider(props: ISliderProps) {
  const { urls = [], alt = 'device' } = props;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  // prettier-ignore
  const {
    activeIdx,
    setActiveIdx,
    onLeftClick,
    onRightClick,
    slideDirection
  } = useSlider({ startIdx: 0, lastIdx: urls.length - 1 , delay: 590 });
  const { onMouseLeave, onMouseMove, imgRef, lensRef, lensOutputRef, isLensActive } = useZoomImageOnMouseEvt();

  const greaterThanOne = urls.length > 1;

  return (
    <>
      {isLensActive && <LensOutput ref={lensOutputRef} />}

      <SliderWrap>
        <InnerWrapper>
          {greaterThanOne && <LeftArrow onClick={onLeftClick}>left</LeftArrow>}

          <ImageMagnify>
            <ImgWrap ref={wrapRef}>
              <SliderImage
                ref={imgRef}
                key={urls[activeIdx]}
                src={urls[activeIdx]}
                alt={alt}
                slideDirection={slideDirection}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                loading="lazy"
              />

              {isLensActive && <Lens ref={lensRef} />}
            </ImgWrap>
          </ImageMagnify>

          {greaterThanOne && <RightArrow onClick={onRightClick}>right</RightArrow>}
        </InnerWrapper>

        {greaterThanOne && <DotImageList urls={urls} onClick={(idx) => setActiveIdx(idx)} alt={alt} />}
      </SliderWrap>
    </>
  );
}

export default DeviceImageSlider;
