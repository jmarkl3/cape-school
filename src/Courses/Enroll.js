import "../Styles/CourseEnroll.css"

import React, {useState} from 'react'
import cardImage from "../Images/shopping-cart-icon-transparent.png"
import { createUserWithEmailAndPassword } from "firebase/auth"

function Enroll(props) {
    
  const [errorMessage, setErrorMessage] = useState(null)

  function enrollNewUser(){

      // If there is a user signed in enroll them
      if(props.userId != null){

        // This will put the course in the user data in the db, set the courseId, and change the page to viewCourse
        props.enrollInCourse(props.userId, props.courseId)
        
        return
 
      }

      // If there is no user signed in create one

      var name = document.getElementById("nameInput").value
      var email = document.getElementById("emailInput").value
      var phone = document.getElementById("phoneInput").value
      var password = document.getElementById("passwordInput").value
  
      console.log("attempting to enroll user with credentials: "+email+" and "+password)
  
      createUserWithEmailAndPassword(props.auth, email, password).then(userCredential=>{          

        // This will put the course in the user data in the db (creating the user), set the courseId, and change the page to viewCourse
        props.enrollInCourse(userCredential.user.uid, props.courseId)

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

  return (
    <div className='enroll'>        
        <div className="backButton" onClick={()=>props.setPage("browseCourses")}>Back</div>
        <div className='enrollWindow'>                        
            <div className={'enrollHalf '+props.userId != null && " enrollWhole"}>
                <div className='priceContainer'>
                  <div className='freeModules'>                    
                    <div className='enrollTitle'>{props.coursesList[props.courseId].name}</div>                    
                  </div>
                  <div className='priceBox'>
                    <img className='cardImage' src={cardImage}></img>
                    <div className='currentPrice'>$129</div>
                    <div className='originalPrice'>$349</div>
                  </div>
                  <div>
                    <div className='freeModulesTitle'>
                      <div className={props.userId != null && " hidden"}>
                        Or try it for free*
                      </div>
                    </div>
                    <div className={'freeModulesList '+props.userId != null && " hidden"}>
                      <ul>
                        <li>* Try the course for free</li>                            
                        <li>* Earn credits for up to 3 chapters</li>                            
                        <li>* No payment information required to start</li>
                      </ul>                                            
                    </div>
                  </div>
                </div>
            </div>
            <div className='verticalLine'></div>
            <div className='enrollHalf'>
              <div className={props.userId != null && " hidden"}>
                <input placeholder='name' id='nameInput'></input>
                <input placeholder='email' id="emailInput"></input>
                <input placeholder='phone' id="phoneInput"></input>
                <input placeholder='password' id="passwordInput"></input>
                {/* <a href='/CourseHome' onClick={()=>enrollNewUser()}>One-Click Enroll</a> */}
                <div className='errorMessage'>{errorMessage}</div>
              </div>
              <div>
                <div className='enrollButton' onClick={()=>enrollNewUser()}>One-Click Enroll (Preview) </div>
                <div className='enrollButton buttonGreen' onClick={()=>enrollNewUser()}>One-Click Enroll</div>
              </div>                
              <div className='underButtonMessage'>* No payment information required to start</div>
            </div>
        </div>
    </div>
  )
}

export default Enroll