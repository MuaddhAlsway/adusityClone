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
      <Suspense fallback={<LoadingSpinner />}>
        <Header/>
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse"></div>}>
        <About/>
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse"></div>}>
        <Project/>
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse"></div>}>
        <Testimonials/>
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse"></div>}>
        <Contactus/>
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse"></div>}>
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
      />
    </div>
  )
}
export default App