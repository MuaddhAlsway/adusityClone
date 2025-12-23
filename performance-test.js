// Performance Testing Script
// Run this in the browser console to test performance

const performanceTest = {
  // Test Core Web Vitals
  measureCoreWebVitals() {
    console.log('🚀 Starting Core Web Vitals measurement...')
    
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('📊 LCP (Largest Contentful Paint):', lastEntry.startTime + 'ms')
      
      if (lastEntry.startTime < 2500) {
        console.log('✅ LCP: Good (< 2.5s)')
      } else if (lastEntry.startTime < 4000) {
        console.log('⚠️ LCP: Needs Improvement (2.5s - 4s)')
      } else {
        console.log('❌ LCP: Poor (> 4s)')
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    // First Input Delay (FID) - measured on first interaction
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log('📊 FID (First Input Delay):', entry.processingStart - entry.startTime + 'ms')
        
        if (entry.processingStart - entry.startTime < 100) {
          console.log('✅ FID: Good (< 100ms)')
        } else if (entry.processingStart - entry.startTime < 300) {
          console.log('⚠️ FID: Needs Improvement (100ms - 300ms)')
        } else {
          console.log('❌ FID: Poor (> 300ms)')
        }
      }
    }).observe({ type: 'first-input', buffered: true })

    // Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      console.log('📊 CLS (Cumulative Layout Shift):', clsValue)
      
      if (clsValue < 0.1) {
        console.log('✅ CLS: Good (< 0.1)')
      } else if (clsValue < 0.25) {
        console.log('⚠️ CLS: Needs Improvement (0.1 - 0.25)')
      } else {
        console.log('❌ CLS: Poor (> 0.25)')
      }
    }).observe({ type: 'layout-shift', buffered: true })
  },

  // Test loading performance
  measureLoadingPerformance() {
    console.log('⏱️ Loading Performance Metrics:')
    
    const navigation = performance.getEntriesByType('navigation')[0]
    
    console.log('📊 DNS Lookup:', navigation.domainLookupEnd - navigation.domainLookupStart + 'ms')
    console.log('📊 TCP Connection:', navigation.connectEnd - navigation.connectStart + 'ms')
    console.log('📊 Server Response:', navigation.responseEnd - navigation.requestStart + 'ms')
    console.log('📊 DOM Processing:', navigation.domComplete - navigation.domLoading + 'ms')
    console.log('📊 Total Load Time:', navigation.loadEventEnd - navigation.navigationStart + 'ms')
  },

  // Test resource loading
  measureResourcePerformance() {
    console.log('📦 Resource Loading Performance:')
    
    const resources = performance.getEntriesByType('resource')
    const imageResources = resources.filter(r => r.initiatorType === 'img')
    const scriptResources = resources.filter(r => r.initiatorType === 'script')
    const cssResources = resources.filter(r => r.initiatorType === 'link')
    
    console.log('🖼️ Images loaded:', imageResources.length)
    console.log('📜 Scripts loaded:', scriptResources.length)
    console.log('🎨 CSS files loaded:', cssResources.length)
    
    // Find largest resources
    const largestResources = resources
      .sort((a, b) => b.transferSize - a.transferSize)
      .slice(0, 5)
    
    console.log('📊 Largest Resources:')
    largestResources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.name.split('/').pop()} - ${(resource.transferSize / 1024).toFixed(2)}KB`)
    })
  },

  // Test animation performance
  measureAnimationPerformance() {
    console.log('🎬 Animation Performance Test:')
    
    let frameCount = 0
    let startTime = performance.now()
    
    function countFrames() {
      frameCount++
      if (frameCount === 60) { // Test for 60 frames
        const endTime = performance.now()
        const fps = 60000 / (endTime - startTime)
        console.log('📊 Average FPS:', fps.toFixed(2))
        
        if (fps >= 55) {
          console.log('✅ Animation Performance: Excellent (>55 FPS)')
        } else if (fps >= 30) {
          console.log('⚠️ Animation Performance: Good (30-55 FPS)')
        } else {
          console.log('❌ Animation Performance: Poor (<30 FPS)')
        }
        return
      }
      requestAnimationFrame(countFrames)
    }
    
    requestAnimationFrame(countFrames)
  },

  // Run all tests
  runAllTests() {
    console.log('🧪 Starting Performance Test Suite...')
    console.log('=====================================')
    
    this.measureLoadingPerformance()
    console.log('-------------------------------------')
    
    this.measureResourcePerformance()
    console.log('-------------------------------------')
    
    this.measureCoreWebVitals()
    console.log('-------------------------------------')
    
    this.measureAnimationPerformance()
    console.log('=====================================')
    console.log('✅ Performance test complete!')
  }
}

// Auto-run tests when script loads
if (typeof window !== 'undefined') {
  window.performanceTest = performanceTest
  console.log('🎯 Performance testing tools loaded!')
  console.log('Run performanceTest.runAllTests() to start testing')
}

export default performanceTest