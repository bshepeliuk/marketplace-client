import { useEffect, useState } from 'react';

const useWindowWidthResize = () => {
  const initialState = {
    width: window.innerWidth,
  };

  const [size, setSize] = useState(initialState);

  const handleWidthResize = (evt: Event) => {
    const target = evt.target as Window;

    setSize((prevSize) => ({ ...prevSize, width: target.innerWidth }));
  };

  useEffect(() => {
    window.addEventListener('resize', handleWidthResize);

    return () => {
      window.removeEventListener('resize', handleWidthResize);
    };
  }, []);

  return {
    size,
  };
};

export default useWindowWidthResize;
