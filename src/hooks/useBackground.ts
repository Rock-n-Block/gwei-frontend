import { useCallback, useEffect, useState } from 'react';

export const useBackground = (): boolean => {
  const [isHeaderBackground, setIsHeaderBackground] = useState<boolean>(false);

  const [scrollY, setScrollY] = useState<number>(0);

  const logIt = useCallback(() => {
    setScrollY(window.scrollY);
    if (scrollY > 100) {
      setIsHeaderBackground(true);
    } else setIsHeaderBackground(false);
  }, [scrollY]);

  useEffect(() => {
    const watchScroll = () => {
      window.addEventListener('scroll', logIt);
    };
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logIt);
    };
  });
  return isHeaderBackground;
};
