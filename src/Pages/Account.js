import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import "../Styles/Account.css"
import { getDatabase, onValue, ref, remove, set } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

function Account(props) {
  
  const [profileData, setProfileData] = useState({
    name:"",
    email:"",
    phone:"",
    address:"",
    about:"",
    imageUrl:""
  }) 
  const [imageFile, setImageFile] = useState(null)
  const storage = getStorage(props.app)

  useEffect(()=>{
    if(props.userId == null){
      props.setPage("Home")
    }
    loadUserData()
  },[])  

  const database = getDatabase(props.app)

  function logOutUser(){
    signOut(props.auth)
    props.setPage("Home")
  }

  function loadUserData(){
    onValue(ref(database, "cape-school/users/"+props.userId+"/profileData"), snap=>{
        var userDataObject = snap.val()  
        if(userDataObject == undefined ){
          setProfileData(
            {
              name:"none loaded",
              email:"",
              phone:"",
              address:"",
              about:"",
              imageUrl:""
            }
          )
          return
        }
      setProfileData(
        {
          name:userDataObject.name,
          email:userDataObject.email,
          phone:userDataObject.phone,
          address:userDataObject.address,
          about:userDataObject.about,
          imageUrl:userDataObject.imageUrl
        })


      // if image is undefined can set it to a default image   

    })

  }
  function saveUserData(){
    var name = document.getElementById("nameInput").value
    var email = document.getElementById("emailInput").value
    var phone = document.getElementById("phoneInput").value
    var address = document.getElementById("addressInput").value
    var about = document.getElementById("aboutInput").value
    
    set(ref(database, "cape-school/users/"+props.userId+"/profileData"),
    {
      name:name,
      email:email,
      phone:phone,
      address:address,
      about:about,      
    })

    // Save the image into storage and save that url into the database
    uploadBytes(storageRef(storage, "cape-school/userImages/"+props.userId), imageFile).then(snap=>{    
      // Get the url  
      console.log(snap.ref) 
      getDownloadURL(snap.ref).then(urlResult=>{
        // Save it in the db
        set(ref(database, "cape-school/users/"+props.userId+"/profileData/imageUrl"), urlResult)
      })
    })
  }

  function imageDrop(event){
    event.preventDefault()
    console.log(event.files[0])    

  }
  function imageChosen(){

    // Get a ref to the chooser
    var imageChooser = document.getElementById("imageFilePicker") 
    
    // Get the file
    var file = imageChooser.files[0]
    
    // Create a url
    var fileUrl = URL.createObjectURL(file) 
    
    // Get a ref to the display and display the selected file
    document.getElementById("imageDisplay").src = fileUrl
    
    // Put the image file in state to be saved when save is pressed
    setImageFile(file)
  }
  function deleteImage(){
    
    // Remove the image from storage    
    var imageRef = storageRef(storage, "cape-school/userImages/"+props.userId)    
    deleteObject(imageRef) 

    // Remove the link from the database
    remove(ref(database, "cape-school/users/"+props.userId+"/profileData/imageUrl"))
    
  }

  return (
    <div className='account'>
      <div className='accountBox'>
        <div className='accountInnerBox'>
          <img src={profileData.imageUrl} onDrop={(event)=>imageDrop(event)} id="imageDisplay"></img>
          <div className='imageButtons'>
            <button className='button' onClick={deleteImage}>Delete</button>
            <label for="imageFilePicker" className='button'>Choose Image</label>
            <input id="imageFilePicker" className='hidden' type={"file"} onChange={imageChosen}></input>
          </div>
        </div>
        <div className='accountInnerBox'>
          Basic Details
          <div>
            <input  placeholder='name' defaultValue={profileData.name} id={"nameInput"}></input>
          </div>
          <div>
            <input placeholder='email' defaultValue={profileData.email} id={"emailInput"}></input>
          </div>
          <div>
            <input placeholder='phone' defaultValue={profileData.phone} id={"phoneInput"}></input>
          </div>
          <div>
            <input placeholder='address' defaultValue={profileData.address} id={"addressInput"}></input>
          </div>
        </div>
        <div className='accountInnerBox'>
          About You
          <textarea defaultValue={profileData.about} id={"aboutInput"}></textarea>
        </div>
        <div className='accountInnerBox'>
          Actions
          <button className='button' onClick={()=>logOutUser()}>Log Out</button>        
          <button className='button'>Reset Password</button>        
          <button className='button' onClick={saveUserData}>Save Changes</button>        
        </div>
        
      </div>
    </div>
  )
}

export default Account