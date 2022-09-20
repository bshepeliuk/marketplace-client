import { useEffect, useState } from 'react';

const useSetBodyScroll = () => {
  const [hasBodyScroll, setHasBodyScroll] = useState(true);

  useEffect(() => {
    if (hasBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [hasBodyScroll]);

  return setHasBodyScroll;
};

export default useSetBodyScroll;
