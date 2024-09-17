import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import AuthForm from './components/LoginPage'
import Backgroundvideo from './components/videobg'
import HomePage from './components/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Backgroundvideo/>}/>
         <Route path="/HomePage" element={<HomePage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
