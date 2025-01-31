import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LandingPage from './assets/pages/LandingPage'

function App() {

  return (
    
    <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
    </Router>
  )
}

export default App
