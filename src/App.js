import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home.js'
import { useState } from 'react';
import About from './Pages/About.js'
import Contact from './Pages/Contact.js'
import Login from './Pages/Login.js'
import Courses from './Pages/Courses.js'

function App() {

  const [page, setPage] = useState("Home")

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
      return (<Login/>)

    if(page === "Courses")
      return (<Courses/>)
    
  }

  return (
    <div className="App">
      <Header
        setPage={setPage}
      ></Header>
      {displayPage()}
      <Footer></Footer>
    </div>
  );
}

export default App;
