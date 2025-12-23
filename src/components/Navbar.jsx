
import { useEffect, useState} from 'react'
import {assets} from '../assets/assets'

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(()=>{
    if(showMobileMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
   return () => {
    document.body.style.overflow = 'auto'
   }
  },[showMobileMenu])

  return (
    <div className='absolute top-0 left-0 w-full z-10'>
      <nav className='container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent' aria-label='Main navigation'>
        <img src={assets.logo} alt="Adusity - Premium Real Estate Portfolio Logo" className='h-8' />
        
        <ul className='hidden md:flex gap-7 text-white' role="menubar">
          <li role="none">
            <a href="#Header" className='cursor-pointer hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1' role="menuitem" aria-label="Navigate to Home section">
              Home
            </a>
          </li>
          <li role="none">
            <a href="#About" className='cursor-pointer hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1' role="menuitem" aria-label="Navigate to About section">
              About
            </a>
          </li>
          <li role="none">
            <a href="#Projects" className='cursor-pointer hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1' role="menuitem" aria-label="Navigate to Projects section">
              Projects
            </a>
          </li>
          <li role="none">
            <a href="#Testimonials" className='cursor-pointer hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1' role="menuitem" aria-label="Navigate to Testimonials section">
              Testimonials
            </a>
          </li>
        </ul>
        
        <button className='hidden md:block bg-white px-8 py-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors' aria-label="Sign up for Adusity services">
          Sign up
        </button>
        
        <button 
          onClick={() => setShowMobileMenu(true)}
          className='md:hidden w-7 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded'
          aria-label="Open mobile navigation menu"
          aria-expanded={showMobileMenu}
          aria-controls="mobile-menu"
        >
          <img src={assets.menu_icon} alt="Open menu" className="w-full h-full" />
        </button>
      </nav>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`md:hidden ${showMobileMenu ? 'fixed w-full' : 'h-0 w-0'} fixed w-full right-0 top-0 bottom-0 overflow-hidden bg-white transition-all z-50`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className='flex justify-end p-6'>
          <button 
            onClick={() => setShowMobileMenu(false)}
            className='cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded'
            aria-label="Close mobile navigation menu"
          >
            <img src={assets.cross_icon} className='w-6' alt="Close menu" />
          </button>
        </div>
        
        <nav aria-label="Mobile navigation">
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium' role="menu">
            <li role="none">
              <a 
                onClick={() => setShowMobileMenu(false)} 
                href="#Header" 
                className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                role="menuitem"
                aria-label="Navigate to Home section"
              >
                Home
              </a>
            </li>
            <li role="none">
              <a 
                onClick={() => setShowMobileMenu(false)} 
                href="#About" 
                className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                role="menuitem"
                aria-label="Navigate to About section"
              >
                About
              </a>
            </li>
            <li role="none">
              <a 
                onClick={() => setShowMobileMenu(false)} 
                href="#Projects" 
                className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                role="menuitem"
                aria-label="Navigate to Projects section"
              >
                Projects
              </a>
            </li>
            <li role="none">
              <a 
                onClick={() => setShowMobileMenu(false)} 
                href="#Testimonials" 
                className='px-4 py-2 rounded-full inline-block hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                role="menuitem"
                aria-label="Navigate to Testimonials section"
              >
                Testimonials
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Navbar