import {React,useEffect, useState} from "react";
import Cards from "./Cards";
import './main.css'
import Navbar from "./Navbar";

const Main = ({todo,setTodo,userName}) => {
  
  return (
    <div>
      <Navbar userName={userName}/>
      <Cards  todo={todo} setTodo={setTodo}/>
    </div>
  );
};

export default Main;
