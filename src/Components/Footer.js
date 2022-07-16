import React from 'react'
import '../Styles/Footer.css'
import logo from '../Images/capeschool-logo.png'

function Footer(props) {
  return (
    <div className='footer'>
        <div className='footerInner'>
            <div className='footerLeft'>
                <img src={logo}></img>
                <div>@2020 Cape School LLC</div>
            </div>
            <div className='footerRight'>
                <div className='third'>
                    <nav>
                        <ul>
                            <li><a onClick={()=>{props.setPage("Home")}}>Home</a></li>
                            <li><a onClick={()=>{props.setPage("About")}}>About</a></li>
                            <li><a onClick={()=>{props.setPage("Contact")}}>Contact</a></li>
                        </ul>
                    </nav>
                </div>
                <div className='third'>
                    <nav>
                        <ul>
                            <li><a onClick={()=>{props.setPage("Courses")}}>Courses</a></li>
                            <li><a onClick={()=>{props.setPage("Support")}}>Support</a></li>
                            <li><a onClick={()=>{props.setPage("Partnership")}}>Partnerships</a></li>
                        </ul>
                    </nav>                    
                </div>
                <div className='third'>
                    <nav>
                        <ul>                            
                            <li><a onClick={()=>{props.setPage("Enroll")}}>Enroll</a></li>
                            <li><a onClick={()=>{props.setPage("Login")}}>Login</a></li>
                            <li><a onClick={()=>{props.setPage("PasswordReset")}}>Password Reset</a></li>
                        </ul>
                    </nav>                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer