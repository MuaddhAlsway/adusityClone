// Image optimization utilities

export const imageConfig = {
  // Profile images
  profile: {
    width: 80,
    height: 80,
    quality: 80
  },
  // Project images
  project: {
    width: 800,
    height: 600,
    quality: 85
  },
  // Brand images
  brand: {
    width: 1200,
    height: 800,
    quality: 85
  },
  // Header images
  header: {
    width: 1920,
    height: 1080,
    quality: 90
  },
  // Logo
  logo: {
    width: 160,
    height: 40,
    quality: 100
  },
  // Icons
  icon: {
    width: 24,
    height: 24,
    quality: 100
  }
}

// Generate srcset for responsive images
export const generateSrcSet = (imagePath, sizes = [320, 640, 960, 1280]) => {
  return sizes.map(size => `${imagePath}?w=${size} ${size}w`).join(', ')
}

// Get image dimensions based on type
export const getImageDimensions = (type) => {
  return imageConfig[type] || imageConfig.project
}

// Preload critical images
export const preloadCriticalImages = (images) => {
  images.forEach(({ src, type }) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    const dims = getImageDimensions(type)
    link.imagesrcset = generateSrcSet(src)
    document.head.appendChild(link)
  })
}

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove('lazy')
          observer.unobserve(img)
        }
      })
    })

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img))
  }
}

// Image loading states
export const imageLoadingStates = {
  loading: 'loading',
  loaded: 'loaded',
  error: 'error'
}

// Get image alt text
export const getImageAlt = (imageName) => {
  const altTexts = {
    'header_img': 'Adusity premium real estate header showcase',
    'brand_img': 'Adusity brand showcase - modern real estate development',
    'project_img_1': 'Skyline Haven - Premium real estate project',
    'project_img_2': 'Vista Verde - Modern residential development',
    'project_img_3': 'Serenity Suites - Luxury apartment complex',
    'project_img_4': 'Central Square - Urban development project',
    'project_img_5': 'Vista Verde - Contemporary housing project',
    'project_img_6': 'Serenity Suites - Premium residential complex',
    'profile_img_1': 'Donald Jackman - Marketing Manager testimonial',
    'profile_img_2': 'Richard Nelson - UI/UX Designer testimonial',
    'profile_img_3': 'James Washington - Co-Founder testimonial',
    'logo': 'Adusity - Premium Real Estate Portfolio Logo',
    'menu_icon': 'Open navigation menu',
    'cross_icon': 'Close navigation menu',
    'star_icon': 'Star rating'
  }
  return altTexts[imageName] || 'Image'
}