import { useRef, useState, MouseEvent } from 'react';

interface IPosition {
  x: number;
  y: number;
}

interface IPositionWithRatio extends IPosition {
  ratio: {
    cx: number;
    cy: number;
  };
}

const useZoomImageOnMouseEvt = () => {
  const [isLensActive, setIsLensActive] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const lensOutputRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (evt: MouseEvent<HTMLElement>) => {
    let position = {
      x: 0,
      y: 0,
    };

    position = getCursorPosition(evt);
    position = calculateLensPosition(position);
    position = preventLensOutside(position);

    const ratio = calculateLensAndOutputRatio();

    setLensPosition(position);
    setLensOutput({ x: position.x, y: position.y, ratio });

    setIsLensActive(true);
  };

  const onMouseLeave = () => {
    setIsLensActive(false);
  };

  const calculateLensPosition = (position: IPosition) => {
    if (lensRef.current === null) return position;

    return {
      x: position.x - lensRef.current.offsetWidth / 2,
      y: position.y - lensRef.current.offsetHeight / 2,
    };
  };

  const setLensPosition = ({ x, y }: IPosition) => {
    if (lensRef.current === null) return;

    lensRef.current.style.left = `${x}px`;
    lensRef.current.style.top = `${y}px`;
  };

  const preventLensOutside = (prevPosition: IPosition) => {
    const position = { ...prevPosition };

    if (imgRef.current === null || lensRef.current === null) return position;

    if (position.x > imgRef.current.width - lensRef.current.offsetWidth) {
      position.x = imgRef.current.width - lensRef.current.offsetWidth;
    }

    if (position.x < 0) position.x = 0;

    if (position.y > imgRef.current.height - lensRef.current.offsetHeight) {
      position.y = imgRef.current.height - lensRef.current.offsetHeight;
    }

    if (position.y < 0) position.y = 0;

    return position;
  };

  const setLensOutput = ({ x, y, ratio }: IPositionWithRatio) => {
    if (imgRef.current === null || lensOutputRef.current === null) return;

    const { cx, cy } = ratio;

    lensOutputRef.current.style.backgroundImage = `url(${imgRef.current.src})`;

    const backgroundPosition = `-${x * cx}px -${y * cy}px`;
    lensOutputRef.current.style.backgroundPosition = backgroundPosition;

    const { width, height } = imgRef.current;
    const backgroundSize = `${width * cx}px ${height * cy}px`;
    lensOutputRef.current.style.backgroundSize = backgroundSize;
  };

  const calculateLensAndOutputRatio = () => {
    if (lensOutputRef.current === null || lensRef.current === null) {
      return { cx: 0, cy: 0 };
    }

    const cx = lensOutputRef.current.offsetWidth / lensRef.current.offsetWidth;
    // prettier-ignore
    const cy = lensOutputRef.current.offsetHeight / lensRef.current.offsetHeight;

    return { cx, cy };
  };

  const getCursorPosition = (evt: MouseEvent<HTMLElement>) => {
    const position = {
      x: 0,
      y: 0,
    };

    if (imgRef.current === null) return position;

    const rect = imgRef.current.getBoundingClientRect();

    position.x = evt.pageX - rect.left;
    position.y = evt.pageY - rect.top;

    return position;
  };

  return {
    imgRef,
    lensRef,
    lensOutputRef,
    onMouseMove,
    onMouseLeave,
    isLensActive,
    setIsLensActive,
  };
};

export default useZoomImageOnMouseEvt;
