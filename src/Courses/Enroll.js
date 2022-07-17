import "../Styles/CourseEnroll.css"

import React, {useState} from 'react'
import cardImage from "../Images/shopping-cart-icon-transparent.png"
import { createUserWithEmailAndPassword } from "firebase/auth"

function Enroll(props) {
    
    function enrollNewUser(){
        
        var name = document.getElementById("nameInput").value
        var email = document.getElementById("emailInput").value
        var phone = document.getElementById("phoneInput").value
        var password = document.getElementById("passwordInput").value
    
        console.log("attempting to enroll user with credentials: "+email+" and "+password)
    
        createUserWithEmailAndPassword(props.auth, email, password).then(userCredential=>{          
          
          // If user is successfully created 
          
          // Put the selected courses in their user data
          props.addCourse(props.courseId)

          // Then go to to their courses page
          props.setPage("userCourses")

        })
        .catch(error=>{          
          displayErrorMessage(error.message)
        })
    
      }

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
    
      const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div className='enroll'>        
        <div className="backButton" onClick={()=>props.setPage("browseCourses")}>Back</div>
        <div className='enrollWindow'>            
            <div className='enrollHalf'>
                <div className='priceContainer'>
                  <div className='freeModules'>
                    <div className='enrollTitle'>{props.coursesData.courses[props.courseId].name}</div>                    
                  </div>
                  <div className='priceBox'>
                    <img className='cardImage' src={cardImage}></img>
                    <div className='currentPrice'>$129</div>
                    <div className='originalPrice'>$349</div>
                  </div>
                  <div className='freeModulesTitle'>
                    Or try it for free*
                  </div>
                  <div className='freeModulesList'>
                    <ul>
                      <li>* Try the course for free</li>                            
                      <li>* Earn credits for up to 3 chapters</li>                            
                      <li>* No payment information required to start</li>
                    </ul>                                            
                  </div>
                </div>
            </div>
            <div className='verticalLine'></div>
            <div className='enrollHalf'>
                <input placeholder='name' id='nameInput'></input>
                <input placeholder='email' id="emailInput"></input>
                <input placeholder='phone' id="phoneInput"></input>
                <input placeholder='password' id="passwordInput"></input>
                {/* <a href='/CourseHome' onClick={()=>enrollNewUser()}>One-Click Enroll</a> */}
                <div className='errorMessage'>{errorMessage}</div>
                <div>
                  <div className='enrollButton' onClick={()=>enrollNewUser()}>One-Click Enroll</div>
                </div>                
                <div className='underButtonMessage'>* No payment information required to start</div>
            </div>
        </div>
    </div>
  )
}

export default Enroll