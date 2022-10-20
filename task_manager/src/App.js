import {React,useState,useEffect} from 'react'
import Login from './Components/frontend_/Login/Login'
import Main from './Components/frontend_/MainPage/Main'
import Register from './Components/frontend_/register/Register'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import Landing from './Components/frontend_/Landing/Landing'
import Profile from './Components/frontend_/MainPage/Profile'
const App = () => {

  const [todo,setTodo] = useState([])
  const [userName,setUserName] = useState('');

  useEffect(()=>{
    const url = `http://localhost:5000/task/${localStorage.getItem('userId')}`;
    fetch(url, { headers: { 
      "Access-Control-Allow-Origin": "*" ,
      "Authorization":`Bearer ${localStorage.getItem('token')}`,
    },
  })
      .then((res) => res.json())
      .then((data) => { 
        console.log(data,"get aaa");
        setTodo(data[0].todoData);
        setUserName(data[0].user)
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
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/main' element={<Main userName={userName} todo={todo} setTodo={setTodo}/>}/>
              <Route path='/profile' element={<Profile userName={userName}/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
