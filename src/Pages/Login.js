import React from 'react'
import { useState, useEffect} from 'react'
import "../Styles/Login.css"
import blueLogo from '../Images/cape_seal_blue-no-year.png'
import {checkActionCode, signInWithEmailAndPassword} from 'firebase/auth'

function Login({auth, userId, setPage}) {

    const [errorMessage, setErrorMessage] = useState("")

    // When user id changes check to see if there is a user, if not go to home screen
    useEffect(()=>{
        if(userId != null)
            setPage("Courses")
        
    },[userId])

    function displayErrorMessage(errorMessage){
        if(errorMessage === "Firebase: Error (auth/configuration-not-found).")
            setErrorMessage("User not found, please check input.")
        else if(errorMessage === "Firebase: Error (auth/invalid-email).")
            setErrorMessage("Invalid email, please check email.")
        else if(errorMessage === "Firebase: Error (auth/internal-error).")
            setErrorMessage("Login error, please check input.")
        else
            setErrorMessage(errorMessage)
    }

    function signIn(){

        var email = document.getElementById("emailInput").value
        var password = document.getElementById("passwordInput").value

        signInWithEmailAndPassword(auth, email, password).then(userCredential =>{            
            
        })
        .catch(error=>{            
            displayErrorMessage(error.message)
        })
    }    

  return (
    <div>
        <div className='login'>
            <div className='loginMenu'>
                <div className='loginHeader'>
                    <div className='loginLogo'>
                        <img src={blueLogo}></img>
                    </div>
                    <div className='loginTitle'>Log In</div>
                    <div className='loginEnrollMessage'>Want to Enroll in a course today? <a>Click Here</a></div>
                </div>
                <div>
                    <div className='loginInputLine'>
                        <label>Email</label>
                        <input id="emailInput" type="email"></input>
                    </div>
                    <div className='loginInputLine'>
                        <label>Password</label>
                        <input id="passwordInput" type="password"></input>
                    </div>
                    <div className='loginInputLine'>
                        <div className='loginButton' onClick={()=>signIn()}>Login</div>                    
                    </div>
                </div>    
                <div className='loginError'>{errorMessage}</div>        
                <div className='loginQuestionsMessage'>
                    Questions or issues? <a>Reset Password</a> or <a>Contact Us Here</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login