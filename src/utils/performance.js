// Performance monitoring utilities

export const measurePerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Measure Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          console.log(`${entry.name}: ${entry.duration}ms`)
        }
      }
    })
    
    observer.observe({ entryTypes: ['measure'] })
    
    // Measure page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      console.log(`Page Load Time: ${loadTime}ms`)
      
      // Measure First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach((entry) => {
        console.log(`${entry.name}: ${entry.startTime}ms`)
      })
    })
  }
}

// Debounce function for performance optimization
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Preload critical resources
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })
}

// Critical resource preloader
export const preloadCriticalResources = async (resources) => {
  const promises = resources.map(src => preloadImage(src))
  try {
    await Promise.all(promises)
    console.log('Critical resources preloaded')
  } catch (error) {
    console.warn('Some resources failed to preload:', error)
  }
}