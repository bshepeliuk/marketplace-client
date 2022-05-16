import { useEffect, useRef } from 'react';

function useCheckFirstRender() {
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}

export default useCheckFirstRender;
