import { useRef } from 'react';
import useContainerDimensions from '@src/common/hooks/useContainerDimensions';
import getListWidthByContainerWidth from '../helpers/getListWidthByContainerWidth';

const useGetCartListWidthByContainerRef = () => {
  const containerRef = useRef(null);
  const { size } = useContainerDimensions(containerRef);

  const width = getListWidthByContainerWidth(size.width);

  return {
    containerRef,
    LIST_WIDTH: width,
  };
};

export default useGetCartListWidthByContainerRef;
