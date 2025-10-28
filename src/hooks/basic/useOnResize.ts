import { useEffect, useRef } from 'react';

const useOnResize = (callback: () => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleResize = () => {
      callbackRef.current();
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
};

export default useOnResize;
