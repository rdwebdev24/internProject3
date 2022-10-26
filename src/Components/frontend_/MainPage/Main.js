import {React, useRef} from "react";
import { Link, Outlet } from "react-router-dom";
import './main.css'
import {  useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";


const Main = () => {
  const navigate = useNavigate();
  const sidebar = useRef();
  let windowWidth = document.body.getBoundingClientRect().width;
  const close2handler = () => {
      sidebar.current.style.left = "-100%"
  }
  return (
    <div style={{height:"100vh"}}>
      <Navbar sidebar={sidebar}/>
      <div ref={sidebar} className="sidebar">
          <Link onClick={close2handler} to='/main/card'>New task</Link>
          <Link onClick={close2handler} to='/main/completed'>completed</Link>
          <Link onClick={close2handler} to='/main/pending'>pending</Link>
      </div>
      <Outlet/>
    </div>
  );
};

export default Main;
