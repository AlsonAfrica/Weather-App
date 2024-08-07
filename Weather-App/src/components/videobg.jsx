import React from 'react';
import videobg from '../assets/video.mp4'
import './LogInPage.css'
import AuthForm from './LoginPage';
const Backgroundvideo = () => {
    return (
       <div className='main'>
        < AuthForm/>
        {/* <h1>hello</h1> */}
        
        <video src={videobg} autoPlay  loop muted></video>
        
       </div>
       
    
     );
}
 
export default Backgroundvideo;