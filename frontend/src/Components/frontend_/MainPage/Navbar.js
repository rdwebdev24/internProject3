import React from 'react'
import {FaUserCircle} from 'react-icons/fa'
const Navbar = ({sidebar}) => {

  const openHandler = () => {
    sidebar.current.style.left = "0"
  }
  return (
    <div style={{zIndex:999}} className='position-fixed w-100'>
      <nav style={{backgroundColor:"#1976d2"}} className="navbar navbar-expand-lg">
          <a style={{cursor:"pointer"}} onClick={openHandler} className="navbar-brand ms-3 text-white">
               Task Manager
          </a>
      </nav>
    </div>
  )
}

export default Navbar
