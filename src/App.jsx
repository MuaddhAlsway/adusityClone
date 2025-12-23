import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { measurePerformance } from './utils/performance'
import Header from './components/Header'
import About from './components/About'
import Project from './components/Project'
import Testimonials from './components/Testimonals'
import Contactus from './components/Contactus'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    try {
      measurePerformance()
    } catch (error) {
      console.warn('Performance monitoring error:', error)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <Header/>
      
      <main role="main" id="main-content">
        <About/>
        <Project/>
        <Testimonials/>
        <Contactus/>
      </main>
      
      <Footer/>
      
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