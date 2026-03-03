import { useState, useRef, useEffect, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

const PLACEHOLDER = '/placeholder.svg';

const OptimizedImage = memo(({ src, alt, className = '', width, height, priority = false, sizes, onError }: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If already cached, mark loaded immediately
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setError(true);
    if (onError) onError(e);
    else (e.target as HTMLImageElement).src = PLACEHOLDER;
  };

  const imgSrc = error ? PLACEHOLDER : src;

  return (
    <img
      ref={imgRef}
      src={imgSrc}
      alt={alt}
      className={`${className} ${!loaded && !priority ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      width={width}
      height={height}
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      onError={handleError}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
