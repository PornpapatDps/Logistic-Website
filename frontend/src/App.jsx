import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css'
import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import Footer from './Footer/Footer'
import Services from './UsServices/Services'
import Expenses from './UsServices/Expenses'
import Consulting from './UsServices/Consulting'
import Packaging from './UsServices/Packaging'
// import Warehousing from './UsServices/Warehousing'
import Register from './Register/Register';
import Contact from './Home/Contact';





function App() {
  return (
     <div className=' font-[Kanit]'> 
     <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={
        <>
          <Home/>       
          <Services />
        </>
        } />
            
            <Route path='/Contact' element={<Contact />} />
            <Route path="/Services" element={<Services />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/Expenses' element={<Expenses />} />
            <Route path='/Consulting' element={<Consulting />} />
            <Route path='/Packaging' element={<Packaging />} />
            {/* <Route path='/Warehousing' element={<Warehousing />} /> */}
            
        </Routes>
        <Footer />
      </Router>
     </div>
  )
}

export default App
