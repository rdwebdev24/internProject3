import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useRef, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {AiFillEdit} from 'react-icons/ai'

const Cards = ({todo,setTodo}) => {
  const [reload,setReload] = useState(true);
  const [data,setData] = useState('');
  const [editDisp,seteditDisp] = useState('');
  const [updateId,setUpdateId] = useState('');
  const textarea = useRef();

  function notify(info,color,icon){
    toast( info,{
      duration:1500,
      style:{
        backgroundColor:color
      }
    })
  }
  
  const input_ref = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    input_ref.current.value = ''
    const url = `http://localhost:5000/task/${localStorage.getItem('userId')}`;
    fetch(url,{
      method:"POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      },
      body:JSON.stringify({data:data})
    })
    .then(res=>res.json())
    .then(data=>{
      console.log('data..created',data);
      setTodo(data[0].todoData);
      notify("👏 created","#36b37e");
    })
    .catch(err=>console.log(err)) 
  }

  const deleteHandler = (id) => {
    const url = "http://localhost:5000/task";
      fetch(`${url}/${id}/${localStorage.getItem('userId')}`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        },
     })
     .then((res) => res.json())
     .then((data) => {
       setTodo(data[0].todoData)
       notify("❕ deleted","#dc3545");
      })
      .catch((err) => console.log(err));
    }
    
    
    const editHandler = (id,data) => {
      seteditDisp('block')
      setUpdateId(id);
      setData(data)
      textarea.current.value = data;
    }
    const UpdateHandler = (e) =>{
      e.preventDefault();
      seteditDisp('none')

    const url = "http://localhost:5000/task";
    fetch(`${url}/${updateId}/${localStorage.getItem('userId')}`, {
      method: "PUT",
      body: JSON.stringify({data:data}),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data[0].todoData)
      })
      .catch((err) => console.log(err));
  }

  const discardHandler = (e) =>{
    e.preventDefault();
    seteditDisp('none')
  }

  useEffect(()=>{
    setReload(!reload)
  },[todo])

  return (
    <>
    <div className='CardWrapper'>
      <div className="form_list_cont">
          <form className='todo_form'>
              <input ref={input_ref} onChange={(e)=>setData(e.target.value)}  type="text" className="form-control" />
              <button onClick={submitHandler} type="submit" className="btn btn-primary">Add</button>
          </form>
          <ul className="list-group">
            {todo.map(item=>{
              const {data,_id} = item;
              return (
                <li key={_id} className="list-group-item list_items">
                  <span>{data}</span>
                    <div className="icon">
                      <a onClick={()=>deleteHandler(_id)}><AiFillDelete/></a>
                      <a onClick={()=>editHandler(_id,data)}><AiFillEdit/></a>
                    </div>
                </li> )
              })}
          </ul>
        </div>
        <Toaster toastOptions={{
          style: {
          color: '#ffff',},}}/>
    </div>

      <div style={{display:editDisp}} className='EditFormWrapper'>
        <form className='edit_form'>
          <textarea onChange={(e)=>{setData(e.target.value)}} ref={textarea} rows="5" cols="5" type="text" className="form-control" />
          <button onClick={UpdateHandler}  type="submit" className="btn btn-primary">Edit</button>
          <button onClick={discardHandler}  type="submit" className="btn btn-primary">Discard</button>
        </form>
     </div>
    </>
  )
}

export default Cards
