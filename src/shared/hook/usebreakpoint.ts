import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [windowSize, setWindowSize] = useState({isMobile:false})

  useEffect(() => {
    const updateBreakpoint = () => {
      setWindowSize({
        isMobile: window.innerWidth <= 768
      })
    }

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
    
  }, [])

  return windowSize
}
