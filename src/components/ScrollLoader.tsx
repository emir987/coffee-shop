import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollLoaderProps {
  onIntersect: () => void;
  isLoading?: boolean;
  children: ReactNode
}

const ScrollLoader: React.FC<ScrollLoaderProps> = ({ onIntersect, isLoading, children }) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const isIntersectingNow = entries[0].isIntersecting;

    if (isIntersectingNow && !isLoading) {
      setIsIntersecting(true);
      onIntersect();
    } else {
      setIsIntersecting(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [onIntersect]);

  return (
    <div>
      {children}
      <div ref={loaderRef} style={{ height: '10px', background: 'transparent' }} />
      {isLoading && isIntersecting && <p>Loading...</p>}
    </div>
  );
};

export default ScrollLoader;
