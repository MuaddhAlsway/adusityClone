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
    const ctx = gsap.context(() => {
      // Title animation
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

      // Image animation
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

      // Stats animation
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

      // Text content animation
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

    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={aboutRef}
      className="flex flex-col items-center justify-center container 
      p-14
      mx-auto md:px-20 lg:px-32 w-full overflow-hidden" 
      id="About"
      aria-labelledby="about-heading"
    >
        <header ref={titleRef}>
          <h1 id="about-heading" className="text-2xl sm:text-4xl font-bold mb-2">About <span className="underline underline-offset-4 decoration-1 font-light">Our Brand</span></h1>
          <p className="text-gray-500 max-w-80 text-center mb-8">Passionate About Properties, Dedicated to Your Vision</p>
        </header>
    <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20">
      <LazyImage 
        ref={imageRef}
        src={assets.brand_img} 
        alt="Adusity brand showcase - modern real estate development and architectural excellence" 
        className='w-full sm:w-1/2 max-w-lg'
        placeholder="Loading brand image..."
      />
      <div className='flex flex-col items-center md:items-start mt-10 text-gray-600'>
        <div 
          ref={statsRef}
          className='grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28'
          role="region"
          aria-label="Company statistics"
        >
          <div>
            <p className='text-4xl font-medium text-gray-800' aria-label="10 plus years of excellence">10+</p>
            <p>Years of Excellence</p>
          </div>
          <div>
            <p className='text-4xl font-medium text-gray-800' aria-label="12 plus projects completed">12+</p>
            <p>Projects Completed</p>
          </div>
          <div>
            <p className='text-4xl font-medium text-gray-800' aria-label="20 plus million square feet delivered">20+</p>
            <p>Mn. Sq. Ft. Delivered</p>
          </div>
          <div>
            <p className='text-4xl font-medium text-gray-800' aria-label="25 plus ongoing projects">25+</p>
            <p>Ongoing Projects</p>
          </div>
        </div>
        <div ref={textRef}>
          <p className='my-10 max-w-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button 
            className='bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            aria-label="Learn more about Adusity services"
          >
            Learn more
          </button>
        </div>
      </div>
    </div>
    </section>

  )
}
export default About