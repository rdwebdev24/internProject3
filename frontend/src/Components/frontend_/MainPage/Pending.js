import React from 'react'
import { useState,useEffect } from 'react';
const Pending = ({todo,reload2,setReload2}) => {
     const [pending,setpending] = useState([]);
     useEffect(()=>{
          setReload2(false); 
          setpending(todo.filter((item)=>item.completed==false))
     },[reload2])
  return (
    <div className='pendingWrapper'>
     <h1>Pending task</h1>
        <ul className="list-group">
            {pending.length?pending.map(item=>{
              const {data,id,completed} = item;
              return (
                <li key={id} className="list-group-item list_items">
                  <div className='list_item_div'>
                    <span>{data}</span>
                  </div>
                    <div className="icon">
                    </div>
                </li> )
              }):<p className='para'>No pending Task</p>}
          </ul>
    </div>
  )
}

export default Pending
