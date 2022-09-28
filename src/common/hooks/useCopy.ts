import { useState, useEffect } from 'react';

const useCopy = () => {
  const [isCopied, setCopied] = useState(false);

  const onCopy = (value: string | number) => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [isCopied]);

  return {
    isCopied,
    onCopy,
  };
};

export default useCopy;
