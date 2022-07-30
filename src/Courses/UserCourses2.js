import { checkActionCode } from 'firebase/auth'
import React, { useEffect } from 'react'

function UserCourses2(props) {

    // props: userCoursesList setPage(page) goToCouse(courseid, page)

    useEffect(()=>{
        // If there is no user signed in and somehow the page goes here redirect to browseCourses
        if(props.userId == null)
            props.setPage("browseCourses")
    },[])
     
  return (
    <div className='page'>                
        <div>
            <button className='button' onClick={()=>props.setPage("browseCourses")}>Browse Courses</button>
        </div>
        {props.userCourseList.map((course, index)=>(
            <div className='courseBox' key={"course"+index}>
                <div className='imageBox borderBox courseImageBox'>
                    <img src={course.imageUrl}></img>
                </div>                
                <div className='borderBox courseInfoBox'>
                    <div className='courseInfoTitle'>
                        {course.title}
                    </div>
                    <div className='courseDescription'>
                        {course.description}
                    </div>
                    <div className='bottomButtonHolder'>
                        <a className='button courseButton' onClick={()=>props.goToCourse(course.id,"editCourse")}>Edit Course</a>
                        <a className='button courseButton' onClick={()=>props.goToCourse(course.id,"viewCourse")}>Continue Course</a>
                    </div>                                  
                </div>
            </div>
        ))}           
    </div>
  )
}

export default UserCourses2