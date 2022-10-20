import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {RiTaskFill} from 'react-icons/ri'
import { Button } from '@mui/material'
import './Landing.css'
const Landing = () => {
     const navigate = useNavigate();
  return (
    <div className='LandingWrapper'>
     <div className="landingInfo">
          <h1>Welcome to</h1>
          <h5>Task Manager <RiTaskFill/>  </h5>
          <div className="signIn_signUp">
               <Button onClick={()=>navigate('/login')} variant="contained">sign In</Button>
               <Button onClick={()=>navigate('/register')} variant="contained">sign Up</Button>
          </div>
     </div>
    </div>
  )
}

export default Landing
