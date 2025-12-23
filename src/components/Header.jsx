import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assets } from '../assets/assets'
import Navbar from "./Navbar"

gsap.registerPlugin(ScrollTrigger)

const Header = () => {
  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const buttonsRef = useRef(null)
  const containerRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    // Simple timeout to ensure elements show even if GSAP fails
    const timeout = setTimeout(() => {
      if (titleRef.current) titleRef.current.style.opacity = '1'
      if (buttonsRef.current) buttonsRef.current.style.opacity = '1'
    }, 100)

    // Ensure elements are visible initially
    if (titleRef.current && buttonsRef.current && containerRef.current) {
      try {
        // Create main timeline
        const tl = gsap.timeline({ delay: 0.5 })
        
        // Initial setup - hide elements
        gsap.set([titleRef.current, buttonsRef.current], { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        })

        // Add dark overlay animation
        gsap.set(overlayRef.current, {
          opacity: 0.7
        })

        // Animate overlay fade in
        tl.to(overlayRef.current, {
          opacity: 0.4,
          duration: 1,
          ease: "power2.out"
        })

        // Animate title with more dramatic effect
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          transformOrigin: "center center"
        }, "-=0.5")

        // Add text typing effect for title (alternative approach)
        .fromTo(titleRef.current, {
          clipPath: "inset(0 100% 0 0)"
        }, {
          clipPath: "inset(0 0% 0 0)",
          duration: 2,
          ease: "power2.out"
        }, "-=1")

        // Animate buttons with stagger and bounce
        .to(buttonsRef.current.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.2
        }, "-=0.5")

        // Add floating animation to container
        gsap.to(containerRef.current, {
          y: -20,
          duration: 3,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1
        })

        // Enhanced parallax effect on scroll
        if (headerRef.current) {
          gsap.to(headerRef.current, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1
            }
          })

          // Fade out content on scroll
          gsap.to(containerRef.current, {
            opacity: 0,
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top top",
              end: "50% top",
              scrub: 1
            }
          })
        }

        // Add mouse move parallax effect
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e
          const { innerWidth, innerHeight } = window
          
          const xPos = (clientX / innerWidth - 0.5) * 20
          const yPos = (clientY / innerHeight - 0.5) * 20
          
          gsap.to(containerRef.current, {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power2.out"
          })
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Cleanup mouse event
        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
        }

      } catch (error) {
        console.error('GSAP animation error:', error)
        // Fallback: make elements visible
        if (titleRef.current) titleRef.current.style.opacity = '1'
        if (buttonsRef.current) buttonsRef.current.style.opacity = '1'
      }
    }

    // Cleanup function
    return () => {
      clearTimeout(timeout)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={headerRef}
      className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden relative" 
      style={{backgroundImage: `url(${assets.header_img})`}} 
      id="Header"
    >
       {/* Dark overlay for better text readability */}
       <div 
         ref={overlayRef}
         className="absolute inset-0 bg-black opacity-40"
       ></div>
       
       <Navbar/> 
       <div 
         ref={containerRef}
         className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white relative z-10"
       >
        <h2 
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20 gsap-element leading-tight"
        >
          Explore homes that fit your dreams
        </h2>
        <div 
          ref={buttonsRef}
          className="space-x-6 mt-16 gsap-element"
        >
            <a className="inline-block border border-white px-8 py-3 rounded hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg" href="#Projects">Project</a>
            <a className="inline-block bg-blue-500 px-8 py-3 rounded hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg" 
            href="#Contact">Contact Us</a>
        </div>
       </div>
    </div>
  )
}
export default Header