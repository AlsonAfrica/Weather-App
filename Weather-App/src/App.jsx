import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthForm from './components/LoginPage'
import Backgroundvideo from './components/videobg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <AuthForm/> */}
       <Backgroundvideo/>
  
    </>
  )
}

export default App
