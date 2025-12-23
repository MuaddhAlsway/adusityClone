import { useEffect, useRef, memo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {assets} from '../assets/assets'
import LazyImage from './LazyImage'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const aboutRef = useRef(null)
  const titleRef = useRef(null)
  const imageRef = useRef(null)
  const statsRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    try {
      const ctx = gsap.context(() => {
        // Title animation
        if (titleRef.current) {
          gsap.fromTo(titleRef.current, 
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }

        // Image animation
        if (imageRef.current) {
          gsap.fromTo(imageRef.current,
            { opacity: 0, x: -100, scale: 0.8 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }

        // Stats animation
        if (statsRef.current && statsRef.current.children) {
          const statItems = statsRef.current.children
          gsap.fromTo(statItems,
            { opacity: 0, y: 30, scale: 0.8 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
              stagger: 0.2,
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }

        // Text content animation
        if (textRef.current) {
          gsap.fromTo(textRef.current,
            { opacity: 0, x: 100 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          )
        }

      }, aboutRef)

      return () => {
        try {
          ctx.revert()
        } catch (e) {
          console.warn('Error reverting GSAP context:', e)
        }
      }
    } catch (error) {
      console.warn('GSAP animation error in About:', error)
    }
  }, [])

  return (
    <section 
      ref={aboutRef}
      className="w-full overflow-hidden py-20 px-4 md:px-20 lg:px-32" 
      id="About"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto">
        <header ref={titleRef} className="text-center mb-16">
          <h1 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="underline underline-offset-4 decoration-1 font-light">Our Brand</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Passionate About Properties, Dedicated to Your Vision
          </p>
        </header>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md">
              <LazyImage 
                ref={imageRef}
                src={assets.brand_img} 
                alt="Adusity brand showcase - modern real estate development and architectural excellence" 
                className='w-full h-auto rounded-lg shadow-lg'
                placeholder="Loading brand image..."
                width={1200}
                height={800}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* Stats Grid */}
            <div 
              ref={statsRef}
              className='grid grid-cols-2 gap-8 md:gap-12 mb-12'
              role="region"
              aria-label="Company statistics"
            >
              <div className="text-center lg:text-left">
                <p className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'>10+</p>
                <p className='text-gray-600 font-medium'>Years of Excellence</p>
              </div>
              <div className="text-center lg:text-left">
                <p className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'>12+</p>
                <p className='text-gray-600 font-medium'>Projects Completed</p>
              </div>
              <div className="text-center lg:text-left">
                <p className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'>20+</p>
                <p className='text-gray-600 font-medium'>Mn. Sq. Ft. Delivered</p>
              </div>
              <div className="text-center lg:text-left">
                <p className='text-4xl md:text-5xl font-bold text-gray-800 mb-2'>25+</p>
                <p className='text-gray-600 font-medium'>Ongoing Projects</p>
              </div>
            </div>

            {/* Text and Button */}
            <div ref={textRef} className="flex flex-col">
              <p className='text-gray-600 text-lg leading-relaxed mb-8'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button 
                className='bg-blue-600 text-white px-8 py-3 rounded font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-fit'
                aria-label="Learn more about Adusity services"
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About