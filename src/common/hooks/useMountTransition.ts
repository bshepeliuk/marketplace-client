import { useEffect, useState } from 'react';

interface IProps {
  isMounted: boolean;
  unmountDelay: number;
}

const useMountTransition = ({ isMounted, unmountDelay }: IProps) => {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    }

    if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isMounted, unmountDelay, hasTransitionedIn]);

  return hasTransitionedIn;
};

export default useMountTransition;
