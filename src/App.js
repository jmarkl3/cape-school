import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home.js'
import { useEffect, useState } from 'react';
import About from './Pages/About.js'
import Account from './Pages/Account.js'
import Contact from './Pages/Contact.js'
import Login from './Pages/Login.js'
import Courses from './Pages/Courses.js'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDxeM3CvIAsBa5Wf5hXpLkbq0wWf6thW6Y",
    authDomain: "portfolioprojects-3b61c.firebaseapp.com",
    projectId: "portfolioprojects-3b61c",
    storageBucket: "portfolioprojects-3b61c.appspot.com",
    messagingSenderId: "744928629400",
    appId: "1:744928629400:web:73c0de638906856e36b6ed"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app)

  useEffect(()=>{
    
  },[])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("signed in user "+ uid)      

      if(userId != user.uid)
        setUserId(user.uid)
      // ...
    } else {
      // User is signed out
      // ...
      console.log("no user signed in")
      if(userId != null)
        setUserId(null)
    }
    //setUserId("user.uid")
  });
  
  const [page, setPage] = useState("Home")
  const [userId, setUserId] = useState(null)

  function displayPage(){
        
    if(page === "Home")
      return <Home
        setPage={setPage}
      ></Home>
          
    if(page === "About")
      return <About></About>
      
    if(page === "Contact")
      return (<Contact/>)
    
    if(page === "Login")
      return (<Login 
        auth={auth} 
        userId={userId}
        setPage={setPage}
      ></Login>)

    if(page === "Courses")
      return (<Courses/>)

    if(page === "Account")
      return (<Account
          setPage={setPage}
          userId={userId}
          auth={auth}
        ></Account>)
    
  }

  return (
    <div className="App">
      <Header
        setPage={setPage}
        userId={userId}
      ></Header>
      {displayPage()}
      <Footer></Footer>
    </div>
  );
}

export default App;
