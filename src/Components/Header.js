import React from 'react'
import logo from '../Images/capeschool-logo.png'
import '../Styles/Header.css'

function Header(props) {
  const {userId, setPage} = props
  return (
    <div className='header'>
        <div className='logo' onClick={()=>setPage("Home")}><img src={logo}></img></div>
        <nav>
            <ul>
                <li><a onClick={(event)=>setPage("Home", event)}>HOME</a></li>
                <li><a onClick={()=>setPage("About")}>ABOUT</a></li>
                <li><a onClick={()=>setPage("Contact")}>CONTACT</a></li>
                <li><a onClick={()=>props.goToCoursePage("userCourses")}>COURSES</a></li>                
                {userId == null ? 
                  <li><a onClick={()=>setPage("Login")}>LOGIN</a></li>                
                  :
                  <li><a onClick={()=>setPage("Account")}>ACCOUNT</a></li>
                }                
            </ul>
        </nav>
    </div>
  )
}

export default Header