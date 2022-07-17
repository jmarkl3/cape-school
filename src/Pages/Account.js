import React, { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import "../Styles/Account.css"

function Account({auth, setPage, userId}) {
  
  useEffect(()=>{
    if(userId == null){
      setPage("Home")
    }
  })  

  return (
    <div className='account'>
      <div className='accountBox'>
        <div className='accountInnerBox'>
          <img></img>
          <div className='imageButtons'>
            <button className='imageButton'>Add</button>
            <button className='imageButton'>Delete</button>
          </div>
        </div>
        <div className='accountInnerBox'>
          Basic Details
          <div>
            <input  placeholder='name'></input>
          </div>
          <div>
            <input placeholder='email'></input>
          </div>
          <div>
            <input placeholder='phone'></input>
          </div>
          <div>
            <input placeholder='address'></input>
          </div>
        </div>
        <div className='accountInnerBox'>
          About You
          <textarea></textarea>
        </div>
        <div className='accountInnerBox'>
          Actions
          <button className='accountButton' onClick={()=>signOut(auth)}>Log Out</button>        
          <button className='accountButton'>Reset Password</button>        
          <button className='accountButton'>Save Changes</button>        
        </div>
        
      </div>
    </div>
  )
}

export default Account