import useWindowResize from '@src/common/hooks/useWindowResize';

const useHandleDeviceByCategoryResize = () => {
  const [width] = useWindowResize();

  const isLessThanLargeScreen = width < 1050;
  const isLargeScreen = width > 1050;

  return {
    isLessThanLargeScreen,
    isLargeScreen,
  };
};

export default useHandleDeviceByCategoryResize;
