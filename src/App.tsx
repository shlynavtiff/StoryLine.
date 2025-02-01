
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import About from './pages/staticPages/About'

function App() {

  return (
    
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
    </Router>
  )
}

export default App
