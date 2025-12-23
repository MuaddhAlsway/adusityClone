import { useState, useEffect, useRef, memo } from "react"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { assets, projectsData } from "../assets/assets"
import LazyImage from './LazyImage'

gsap.registerPlugin(ScrollTrigger)

const ProjectCard = memo(({ project, index, cardsToShow }) => {
  return (
    <div 
      className={`relative flex-shrink-0 px-3 group cursor-pointer ${
        cardsToShow === 1 ? 'w-full' : 
        cardsToShow === 2 ? 'w-1/2' : 
        'w-1/4'
      }`}
    >
      <div className="overflow-hidden rounded-lg">
        <LazyImage 
          src={project.image} 
          alt={project.title} 
          className="w-full h-auto mb-14 rounded-lg transition-transform duration-500 group-hover:scale-110"
          placeholder="Loading..."
        />
      </div>
      <div className="absolute left-3 right-3 bottom-5 flex justify-center">
        <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md rounded transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
          <p className="text-gray-500 text-sm">
            {project.price} <span className="px-1">|</span> {project.location}
          </p>
        </div>
      </div>
    </div>
  )
})

ProjectCard.displayName = 'ProjectCard'

const Project = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsToShow, setCardsToShow] = useState(1)
    const projectRef = useRef(null)
    const titleRef = useRef(null)
    const cardsRef = useRef(null)

    useEffect(() => {
        const updateCardsToShow = () => {
            if (window.innerWidth >= 1024) {
                setCardsToShow(4)
            } else if (window.innerWidth >= 768) {
                setCardsToShow(2)
            } else {
                setCardsToShow(1)
            }
        }

        updateCardsToShow()
        window.addEventListener('resize', updateCardsToShow)
        return () => window.removeEventListener('resize', updateCardsToShow)
    }, [])

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

            // Cards animation
            const cards = cardsRef.current.children[0].children
            gsap.fromTo(cards,
                { opacity: 0, y: 100, scale: 0.8 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            )

        }, projectRef)

        return () => ctx.revert()
    }, [])

    const nextProject = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex + cardsToShow >= projectsData.length ? 0 : prevIndex + 1
        )
    }

    const prevProject = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? Math.max(0, projectsData.length - cardsToShow) : prevIndex - 1
        )
    }

  return (
    <div 
        ref={projectRef}
        className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden" 
        id="Projects"
    >
        <div ref={titleRef}>
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">Projects <span className="underline underline-offset-4 decoration-1 font-light">Completed</span></h1>
            <p className="text-center text-gray-500 mb-8 max-w-80 mx-auto">Crafting Spaces, Building Legacies-Explore Our Portfolio</p>
        </div>
    
    {/* Slider Buttons */}
    <div className="flex justify-end items-center mb-8">
        <button 
            onClick={prevProject}
            className="p-3 bg-gray-200 rounded mr-2 hover:bg-gray-300 transition-all duration-300 transform hover:scale-110" 
            aria-label="Previous Project"
        >
            <img src={assets.left_arrow} alt="Previous" />
        </button>
        <button 
            onClick={nextProject}
            className="p-3 bg-gray-200 rounded mr-2 hover:bg-gray-300 transition-all duration-300 transform hover:scale-110" 
            aria-label="Next Project"
        >
            <img src={assets.right_arrow} alt="Next" />
        </button>
    </div>

    {/* Project slider container */}
    <div ref={cardsRef} className="overflow-hidden">
        <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
        >
            {projectsData.map((project, index) => (
                <ProjectCard 
                  key={`${project.title}-${index}`}
                  project={project}
                  index={index}
                  cardsToShow={cardsToShow}
                />
            ))}
        </div>
    </div>
    </div>

  )
}
export default Project