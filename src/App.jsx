import About from "./components/About"
import Contactus from "./components/Contactus"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Project from "./components/Project"
import Testimonials from "./components/Testimonals"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="w-full overflow-hidden">
      <Header/>
      <About/>
      <Project/>
      <Testimonials/>
      <Contactus/>
      <Footer/>
      <ToastContainer />
    </div>
  )
}
export default App