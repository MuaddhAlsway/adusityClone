# Adusity - Real Estate Portfolio Website

A modern, responsive real estate portfolio website built with React, Vite, Tailwind CSS, and GSAP animations.

## Features

- 🏠 Modern real estate portfolio design
- 📱 Fully responsive layout
- ✨ GSAP animations and scroll triggers
- 📧 Contact form with Web3Forms integration
- 📬 Newsletter subscription
- 🎨 Beautiful UI with Tailwind CSS
- 🚀 Fast performance with Vite

## Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP** - Professional animations
- **React Toastify** - Toast notifications
- **Web3Forms** - Form handling service

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
cd YOUR_REPOSITORY_NAME
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Deployment to GitHub Pages

### Step 1: Update Configuration

1. **Update package.json homepage URL:**
   Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` in package.json:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME"
   ```

2. **Update vite.config.js base path:**
   Replace `YOUR_REPOSITORY_NAME` in vite.config.js:
   ```javascript
   base: '/YOUR_REPOSITORY_NAME/'
   ```

### Step 2: Deploy

1. **Build and deploy:**
   ```bash
   npm run deploy
   ```

2. **Enable GitHub Pages:**
   - Go to your GitHub repository
   - Navigate to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click Save

3. **Access your live site:**
   Your site will be available at: `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME`

### Step 3: Update for Future Deployments

For future updates, simply run:
```bash
npm run deploy
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Hero section with navigation
│   ├── About.jsx       # About section
│   ├── Project.jsx     # Projects showcase
│   ├── Testimonals.jsx # Customer testimonials
│   ├── Contactus.jsx   # Contact form
│   ├── Footer.jsx      # Footer with newsletter
│   └── Navbar.jsx      # Navigation component
├── assets/             # Images and static assets
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Contact Form Setup

The contact form uses Web3Forms for handling submissions. To set up:

1. Visit [web3forms.com](https://web3forms.com)
2. Create a free account
3. Get your access key
4. The access key is already configured in the project

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**Note:** Remember to replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name before deploying.
