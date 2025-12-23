import { testimonialsData, assets } from '../assets/assets'

const Testimonials = () => {
  return (
    <section className='container mx-auto py-10 lg:px-32 w-full overflow-hidden' id='Testimonials' aria-labelledby="testimonials-heading">
        <h1 id="testimonials-heading" className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Customer <span className='underline underline-offset-4 decoration-1 font-light'>Testimonials</span></h1>
        <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>Real Stories from those Who Found Home With us</p>

        <div className='flex flex-wrap justify-center gap-8'>
            {testimonialsData.map((testimonial, index) => (
                <article className='max-w-[340px] border shadow-lg rounded px-8 py-12 text-center' key={index}>
                    <img 
                        className='w-20 h-20 rounded-full mx-auto mb-4' 
                        src={testimonial.image} 
                        alt={testimonial.alt}
                        width={80}
                        height={80}
                        loading="lazy"
                        decoding="async"
                    />
                    <h2 className='text-xl text-gray-700 font-medium'>{testimonial.name}</h2>
                    <p className='text-gray-500 mb-4 text-sm'>{testimonial.title}</p>
                    <div className='flex justify-center gap-1 text-red-500 mb-4' aria-label={`${testimonial.rating} out of 5 stars`}>
                        {Array.from({length: testimonial.rating}, (_, i) => (
                            <img 
                              key={i} 
                              src={assets.star_icon} 
                              alt="star" 
                              width={16}
                              height={16}
                              loading="lazy"
                              decoding="async"
                            />
                        ))}
                    </div>
                    <p className='text-gray-600'>{testimonial.text}</p>
                </article>
            ))} 
        </div>
    </section>
  )
}

export default Testimonials