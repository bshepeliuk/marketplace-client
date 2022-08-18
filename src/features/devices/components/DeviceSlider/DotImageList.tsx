import React from 'react';
import { DotImage, DotsList } from '../../styles/deviceSlider.styled';

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

export default DotImageList;
