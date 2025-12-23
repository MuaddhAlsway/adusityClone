import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from "./Navbar"

gsap.registerPlugin(ScrollTrigger)

const Header = () => {
  const headerRef = useRef(null)
  const titleRef = useRef(null)
  const buttonsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Initial setup - hide elements
    gsap.set([titleRef.current, buttonsRef.current], { 
      opacity: 0, 
      y: 50 
    })

    // Animate elements in sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")

    // Parallax effect on scroll
    gsap.to(headerRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

  }, [])

  return (
    <div 
      ref={headerRef}
      className="min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden" 
      style={{backgroundImage: "url('/header_img.png')"}} 
      id="Header"
    >
       <Navbar/> 
       <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white">
        <h2 
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20"
        >
          Explore homes that fit your dreams
        </h2>
        <div 
          ref={buttonsRef}
          className="space-x-6 mt-16"
        >
            <a className="border border-white px-8 py-3 rounded hover:bg-white hover:text-black transition-all duration-300" href="#Projects">Project</a>
            <a className="bg-blue-500 px-8 py-3 rounded hover:bg-blue-600 transition-all duration-300" 
            href="#Contact">Contact Us</a>
        </div>
       </div>
    </div>
  )
}
export default Header