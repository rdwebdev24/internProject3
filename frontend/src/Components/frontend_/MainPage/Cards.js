import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useRef, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'
import {AiFillEdit} from 'react-icons/ai'

const Cards = ({setReload2,todo,setTodo}) => {
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
    const url = `http://localhost:5000/task`;
    fetch(url,{
      method:"POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
      body:JSON.stringify({data:data,status:false})
    })
    .then(res=>res.json())
    .then(data=>{
      console.log('data..created',data);
      setTodo(data.data);
      setReload2(true);
      setData('')
      notify("👏 created","#36b37e");
    })
    .catch(err=>console.log(err)) 
  }

  const deleteHandler = (id) => {
    const url = "http://localhost:5000/task";
      fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
     })
     .then((res) => res.json())
     .then((data) => {
       setTodo(data.data)
       setReload2(true);
       notify("❕ deleted","#eb3941");
      })
      .catch((err) => console.log(err));
    }

  const deleteAllHandler = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/task";
      fetch(url, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
     })
     .then((res) => res.json())
     .then((data) => {
       setTodo(data.data)
       setReload2(true);
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
    fetch(`${url}/${updateId}`, {
      method: "PUT",
      body: JSON.stringify({data:data}),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    }).then((res) => res.json())
      .then((data) => {
        console.log(data,"updated");
        setTodo(data.data)
        setReload2(true);
      })
      .catch((err) => console.log(err));
  }

  const discardHandler = (e) =>{
    e.preventDefault();
    seteditDisp('none')
  }


    const checkRef = useRef();
    const completedHandler = (item,val) => {
      const url = "http://localhost:5000/task";
      fetch(`${url}/${item.id}/status`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
      }).then((res) => res.json())
        .then((data) => {
          console.log(data,"updated");
          setTodo(data.data)
          setReload2(true);
        })
        .catch((err) => console.log(err));
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
              <button onClick={deleteAllHandler} type="submit" className="btn btn-primary">Delete All</button>
          </form>
          <ul className="list-group">
            {todo.length?todo.map(item=>{
              const {data,id,completed} = item;
              return (
                <li key={id} className="list-group-item list_items">
                  <div className='list_item_div'>
                    <input checked={completed} value={id} ref={checkRef} onChange={(e)=>completedHandler(item)} style={{cursor:"pointer"}} type="checkbox"/>
                    <span>{data}</span>
                  </div>
                    <div className="icon">
                      <a onClick={()=>deleteHandler(id)}><AiFillDelete/></a>
                      <a onClick={()=>editHandler(id,data)}><AiFillEdit/></a>
                    </div>
                </li> )
              }):<p>Nothing to show</p>}
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
