import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({items, removedItem, editItem}) => {
  return(
 <div className="grocery-list">
   {items.map((item)=>{
     const {id, title} = item
     return (
       <article className="grocery-item" >
        
         <p className="title" key={id}>{title}</p>
         <div>
         <button className="edit-btn" onClick={()=>editItem(id)} ><FaEdit/></button>
         <button className="delete-btn" onClick={()=>removedItem(id)} ><FaTrash/> </button>

         </div>
      
       </article>
     )
   })}

 </div>

)
 
}

export default List
