import React, { useEffect } from 'react'

const Alert = ({type, msg, removedAlert, list}) => {
useEffect(() => {
 const timeOut = setTimeout(()=>{
    removedAlert()
  }, 3000)
  return ()=>clearTimeout(timeOut)

}, [list])

  return <p className={`alert alert-${type}`} > {msg}</p>
}

export default Alert
