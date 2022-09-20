import React from 'react';
import useNewDeviceContext from '../../hooks/useNewDeviceContext';
import { DeleteImgButton, PreviewImage, PreviewListItem } from '../../styles/deviceForm.styled';

function PreviewImageItem({ image }: { image: { url: string; id: string } }) {
  const context = useNewDeviceContext();

  const onDelete = () => {
    context.deleteImgById(image.id);
  };

  return (
    <PreviewListItem>
      <PreviewImage src={image.url} alt="preview" />
      <DeleteImgButton type="button" onClick={onDelete}>
        delete
      </DeleteImgButton>
    </PreviewListItem>
  );
}

export default PreviewImageItem;
