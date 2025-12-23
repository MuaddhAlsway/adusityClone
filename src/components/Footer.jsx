import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    if (footerRef.current) {
      const ctx = gsap.context(() => {
        const footerSections = footerRef.current.children[0].children
        
        gsap.fromTo(footerSections,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )

      }, footerRef)

      return () => ctx.revert()
    }
  }, [])

  const handleSubscribe = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd8b6293d-3c92-4d20-8051-619ed246f9c3',
          email: email,
          subject: 'New Newsletter Subscription',
          message: `New newsletter subscription from: ${email}\n\nThank you for subscribing to our company newsletter!`
        })
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Thank you for subscribing to our newsletter!')
        setEmail('')
      } else {
        toast.error('Sorry, there was an error with your subscription. Please try again.')
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      toast.error('Sorry, there was an error with your subscription. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div 
        ref={footerRef}
        className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden' 
        id='Footer'
    >
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>
        <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <img src={assets.logo} alt="Adusity - Premium Real Estate Portfolio Logo" className='mb-4 w-40' />
          <p className='text-gray-400 leading-relaxed'>
            Building exceptional digital experiences with cutting-edge technology and innovative design solutions.
          </p>
        </div>

        <div className='w-full md:w-1/3 mb-8 md:mb-0'>
          <h2 className='text-white text-lg font-semibold mb-4'>Quick Links</h2>
          <nav aria-label="Footer navigation">
            <ul className='text-gray-400 space-y-2'>
              <li><a href="#Header" className='hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded'>Home</a></li>
              <li><a href="#About" className='hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded'>About</a></li>
              <li><a href="#Projects" className='hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded'>Projects</a></li>
              <li><a href="#Testimonials" className='hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded'>Testimonials</a></li>
              <li><a href="#Contact" className='hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded'>Contact</a></li>
            </ul>
          </nav>
        </div>

        <div className='w-full md:w-1/3'>
          <h2 className='text-white text-lg font-semibold mb-4'>Newsletter</h2>
          <p className='text-gray-400 mb-4'>Subscribe to get updates on our latest projects</p>
          <form onSubmit={handleSubscribe} className='flex' role="form" aria-label="Newsletter subscription">
            <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
            <input 
              id="newsletter-email"
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className='flex-1 px-4 py-2 rounded-l-md border border-white outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              aria-describedby="newsletter-description"
              required
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-r-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                isSubmitting 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              aria-label={isSubmitting ? 'Subscribing to newsletter...' : 'Subscribe to newsletter'}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p id="newsletter-description" className="sr-only">
            Subscribe to receive updates about our latest real estate projects and services.
          </p>
        </div>
      </div>

      <div className='border-t border-gray-700 mt-10 pt-6 pb-6'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
          <p className='text-gray-400 text-sm mb-4 md:mb-0'>
            © 2024 Your Company Name. All rights reserved.
          </p>
          <div className='flex space-x-6'>
            <a href="#" className='text-gray-400 hover:text-white transition-colors text-sm'>Privacy Policy</a>
            <a href="#" className='text-gray-400 hover:text-white transition-colors text-sm'>Terms of Service</a>
            <a href="#" className='text-gray-400 hover:text-white transition-colors text-sm'>Cookie Policy</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer