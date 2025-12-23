import { useState, useRef, useEffect } from 'react'

const LazyImage = ({ src, alt, className, placeholder, width = 800, height = 600, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  // Ensure alt text is always provided
  const altText = alt || 'Image'

  return (
    <div 
      ref={imgRef} 
      className={`relative ${className}`}
      style={{
        aspectRatio: `${width}/${height}`
      }}
      {...props}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
          {placeholder ? (
            <span className="text-gray-400 text-sm" aria-label="Loading image">
              {placeholder}
            </span>
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" aria-label="Loading"></div>
          )}
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}>
          <span className="text-sm">Image unavailable</span>
        </div>
      )}
      
      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={altText}
          width={width}
          height={height}
          className={`transition-opacity duration-300 w-full h-auto ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}

export default LazyImage