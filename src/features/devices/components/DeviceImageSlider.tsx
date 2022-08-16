import React from 'react';
import useSlider from '@src/common/hooks/useSlider';

import {
  DotImage,
  DotsList,
  LeftArrow,
  RightArrow,
  SliderImage,
  SliderWrap,
  ImageWrapper,
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
  } = useSlider({ startIdx: 0, lastIdx: urls.length - 1 , delay: 600 });

  const greaterThanOne = urls.length > 1;

  return (
    <SliderWrap>
      <ImageWrapper>
        {greaterThanOne && <LeftArrow onClick={onLeftClick}>left</LeftArrow>}

        <SliderImage
          key={urls[activeIdx]}
          src={urls[activeIdx]}
          alt={alt}
          slideDirection={slideDirection}
        />

        {greaterThanOne && (
          <RightArrow onClick={onRightClick}>right</RightArrow>
        )}
      </ImageWrapper>

      {greaterThanOne && (
        <DotsList className="custom-scrollbar-horizontal">
          {urls.map((url, idx) => (
            <DotImage
              key={url}
              src={url}
              alt={alt}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </DotsList>
      )}
    </SliderWrap>
  );
}

export default DeviceImageSlider;
