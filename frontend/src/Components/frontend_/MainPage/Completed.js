import React, { useEffect, useState } from 'react'

const Completed = ({todo,reload2,setReload2}) => {
     const [completed,setCompleted] = useState([]);
     useEffect(()=>{
          setReload2(false); 
          setCompleted(todo.filter((item)=>item.completed==true))
     },[reload2])
  return (
    <div className='completed'>
     <h1>Completed Task</h1>
           <ul className="list-group">
            {completed.length?completed.map(item=>{
              const {data,id,completed} = item;
              return (
                <li key={id} className="list-group-item list_items">
                  <div className='list_item_div'>
                    <span>{data}</span>
                  </div>
                    <div className="icon">
                    </div>
                </li> )
              }):<p className='para'>All task are cpmpleted</p>}
          </ul>
    </div>
  )
}

export default Completed
