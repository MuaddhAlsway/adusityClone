import { lazy, Suspense, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { measurePerformance, preloadCriticalResources } from './utils/performance'
import { assets } from './assets/assets'

// Lazy load components
const About = lazy(() => import("./components/About"))
const Contactus = lazy(() => import("./components/Contactus"))
const Footer = lazy(() => import("./components/Footer"))
const Header = lazy(() => import("./components/Header"))
const Project = lazy(() => import("./components/Project"))
const Testimonials = lazy(() => import("./components/Testimonals"))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
)

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    measurePerformance()
    
    // Preload critical resources
    const criticalResources = [
      assets.header_img,
      assets.brand_img,
      assets.logo
    ]
    preloadCriticalResources(criticalResources)
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Header/>
      </Suspense>
      
      <main role="main" id="main-content">
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse loading-skeleton" aria-label="Loading about section"></div>}>
          <About/>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse loading-skeleton" aria-label="Loading projects section"></div>}>
          <Project/>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse loading-skeleton" aria-label="Loading testimonials section"></div>}>
          <Testimonials/>
        </Suspense>
        
        <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse loading-skeleton" aria-label="Loading contact section"></div>}>
          <Contactus/>
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse loading-skeleton" aria-label="Loading footer"></div>}>
        <Footer/>
      </Suspense>
      
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="text-sm"
        role="alert"
        aria-live="polite"
      />
    </div>
  )
}
export default App