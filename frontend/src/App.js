import {React,useState,useEffect} from 'react'
import Main from './Components/frontend_/MainPage/Main'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import Landing from './Components/frontend_/Landing/Landing'
import Completed from './Components/frontend_/MainPage/Completed';
import Pending from './Components/frontend_/MainPage/Pending';
import Cards from './Components/frontend_/MainPage/Cards';
const App = () => {

  const [todo,setTodo] = useState([])
  const [reload2,setReload2] = useState(false);
  useEffect(()=>{
    const url = `http://localhost:5000/task`;
    fetch(url, { headers: { 
      "Access-Control-Allow-Origin": "*" ,
    },
  })
      .then((res) => res.json())
      .then((data) => { 
        setTodo(data.data);
        setReload2(true);
      })
      .catch((err) => {
         console.log(err)
    });

  },[])

  return (
    <div>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='main' element={<Main reload2={reload2} setReload2={setReload2}  todo={todo} setTodo={setTodo}/>}>
                <Route path='completed' element={<Completed setReload2={setReload2} reload2={reload2} todo={todo}/>}/>
                <Route path='pending' element={<Pending setReload2={setReload2} reload2={reload2} todo={todo}/>}/>
                <Route path='card' element={<Cards setReload2={setReload2} todo={todo} setTodo={setTodo}/>}/>
              </Route>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
