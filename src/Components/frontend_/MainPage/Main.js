import {React, useRef} from "react";
import { Link, Outlet } from "react-router-dom";
import './main.css'
import Navbar from "./Navbar";



const Main = () => {
  const sidebar = useRef();
  let windowWidth = document.body.getBoundingClientRect().width;
  const close2handler = () => {
      sidebar.current.style.left = "-100%"
  }
  return (
    <div>
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
