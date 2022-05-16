import { useEffect, useState } from 'react';

interface IProps {
  isLoading: boolean;
  duration: number;
}

function useSlowDownLoaderIndicator({ isLoading, duration }: IProps) {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isLoading) {
      setLoading(true);
    } else {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, duration);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  return loading;
}

export default useSlowDownLoaderIndicator;
