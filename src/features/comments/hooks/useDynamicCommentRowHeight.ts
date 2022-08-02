import { MutableRefObject, useEffect } from 'react';
import useCommentsContext from './useCommentsContext';

interface IProps {
  rowRef: MutableRefObject<HTMLDivElement | null>;
  rowIndex: number;
  deps?: Array<any>;
}

const useDynamicCommentRowHeight = ({
  rowRef,
  rowIndex,
  deps = [],
}: IProps) => {
  const { setSize, windowWidth } = useCommentsContext();

  useEffect(() => {
    let ignore = false;

    if (rowRef.current === null) return;

    if (!ignore) {
      setSize(rowIndex, rowRef.current.getBoundingClientRect().height);
    }

    return () => {
      ignore = true;
    };
  }, [setSize, windowWidth, ...deps]);
};

export default useDynamicCommentRowHeight;
