import React from 'react'
import {FaUserCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Navbar = ({userName}) => {
  return (
    <div style={{zIndex:999}} className='position-fixed w-100'>
      <nav style={{backgroundColor:"#1976d2"}} className="navbar navbar-expand-lg">
          <a className="navbar-brand ms-3 text-white" href="#">
               Task Manager
          </a>
               <div className="navbar-brand ms-3 text-white">
                    <Link className='profileicon' to='/profile'>
                         {userName.first_name} <FaUserCircle/>
                    </Link>
               </div>
      </nav>
    </div>
  )
}

export default Navbar
