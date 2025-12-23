import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toast } from 'react-toastify'

gsap.registerPlugin(ScrollTrigger)

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactRef = useRef(null)
  const titleRef = useRef(null)
  const formRef = useRef(null)

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

      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, contactRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd8b6293d-3c92-4d20-8051-619ed246f9c3',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Contact Form Submission'
        })
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Thank you for your message! We will get back to you soon.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
        setFormData({
          name: '',
          email: '',
          message: ''
        })
      } else {
        toast.error('Sorry, there was an error sending your message. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Sorry, there was an error sending your message. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div 
        ref={contactRef}
        className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden' 
        id='Contact'
    >
        <div ref={titleRef}>
            <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>
                Contact <span className='underline underline-offset-4 decoration-1 under font-light'>With us</span>
            </h1>
            <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
                Ready to make a move? Let's build Your Future Together
            </p>
        </div>

        <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className='max-w-2xl mx-auto text-gray-600 pt-8'
        >
            <div className='flex flex-wrap'>
                <div className='w-full md:w-1/2 text-left'>
                    Your Name
                    <input 
                        className='w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:border-blue-500 focus:outline-none transition-all duration-300' 
                        required 
                        name='name' 
                        placeholder='Your Name'
                        type="text" 
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
                <div className='w-full md:w-1/2 text-left md:pl-4'>
                    Your Email
                    <input 
                        className='w-full border border-gray-300 rounded py-3 px-4 mt-2 focus:border-blue-500 focus:outline-none transition-all duration-300' 
                        required 
                        name='email' 
                        placeholder='Your Email'
                        type="email" 
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </div>
            <div className='my-6 text-left'>
                Message
                <textarea 
                    className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none focus:border-blue-500 focus:outline-none transition-all duration-300' 
                    required 
                    name='message' 
                    placeholder='Message'
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                ></textarea>
            </div>

            <button 
                type='submit'
                disabled={isSubmitting}
                className={`py-2 px-12 mb-10 rounded transition-all duration-300 transform hover:scale-105 ${
                    isSubmitting 
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                }`}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    </div>
  )
}

export default Contactus