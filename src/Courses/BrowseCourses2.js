import React, { useEffect, useState } from 'react'

function BrowseCourses2(props) {

  const [editing, setEditing] = useState(false)


  function enroll(course){

    // The enroll page is different depending on if there is a user signed in or not
    props.openEnrollPage(course.id)     

    // This just gives the course data directly and saves a function call (getCourseData(courseId)) in Courses2.js
    //props.openEnrollPage2(course)   

  }

  function editCourse(){    
    setEditing(!editing)
  }

  function updateCourse(_courseId){
    var title = document.getElementById("titleInput"+_courseId).value
    var description = document.getElementById("descriptionInput"+_courseId).value
    
    props.updateCourse(_courseId, title, description)
  }


  return (
    <div className='page'>        
      <div className='courseBoxSmaller'>
        <div className='browseCoursesButtonBox'>
          <button className='button' onClick={props.createCourse}>Add course</button>
          <div className='button' onClick={()=>editCourse()}>{editing ? "Stop Editing":"Edit Courses"}</div>   
          {props.userId != null && <button className='button' onClick={()=>props.setPage("userCourses")}>Your Courses</button>}
        </div>          
      </div>
    {
        props.courseList.map(course=>(
            <div className='courseBox'>
              <div className='imageBox borderBox courseImageBox'>
                  <img src={course.imageUrl}></img>
              </div>                
              <div className='borderBox courseInfoBox'>
                  {!editing && 
                    <div className='courseInfoTitle'>
                        {course.title}
                    </div>                  
                  }
                  {editing && <input className='courseInfoTitleEdit' id={"titleInput"+course.id} defaultValue={course.title}></input>}
                  {!editing && 
                    <div className='courseDescription'>
                        {course.description}
                    </div>                  
                  }
                  {editing && <textarea className='courseDescriptionEdit' id={"descriptionInput"+course.id} defaultValue={course.description}></textarea>}
                  {editing && <div className='button bottomButton courseButton' onClick={()=>props.deleteCourse(course.id)}>Delete Course</div>       }      
                  {editing && <div className='button bottomButton courseButton' onClick={()=>updateCourse(course.id)}>Save Changes</div>}      
                  {(props.userIsInCourse(course.id) && !editing) ?                                          
                      <div className='bottomButtonHolder'>
                        <a className='button courseButton' onClick={()=>props.goToCourse(course.id,"editCourse")}>Edit Course</a>
                        <a className='button courseButton' onClick={()=>props.goToCourse(course.id,"viewCourse")}>Continue Course</a>
                      </div>                   
                      :
                      <a className='button bottomButton courseButton' onClick={()=>enroll(course)}>View Details / Enroll</a>                        
                    }  
                  
              </div>
            </div>
        ))
    }
    
    </div>
  )
}

export default BrowseCourses2