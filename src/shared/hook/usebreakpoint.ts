import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleMediaQueryChange(mediaQuery);

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return { isMobile };
}