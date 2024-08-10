import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthForm from './components/LoginPage'
import Backgroundvideo from './components/videobg'
import HomePage from './components/HomePage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <AuthForm/> */}
       {/* <Backgroundvideo/> */}
       <HomePage/>
  
    </>
  )
}

export default App
