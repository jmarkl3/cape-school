import { checkActionCode } from 'firebase/auth'
import React, { useEffect } from 'react'

function UserCourses(props) {

    useEffect(()=>{
        // If there is no user signed in and somehow the page goes here redirect to browseCourses
        if(props.userId == null)
            props.setPage("browseCourses")
    },[])

    // Returns an array with the ids of each course the user is in
    function userCoursesArray(){
        if(props.userData == null)         
            return []
        
        var tempArray = []
        for(var userCourseId in props.userData.courses)            
            tempArray.push(userCourseId)        

        return tempArray
    }
    
    // Takes an array of course ids and returns an array of course data for each one
    function courseDataArray(idArray){
        var tempArray = []
        for(var id in idArray){
            if(props.coursesList == undefined){
                console.log("undefined course data: ")
                console.log(props.coursesData)
                continue
            }

            var courseData = props.coursesList[idArray[id]]            
            if(courseData === undefined){
                courseData = {}
                courseData.name = "Course not found"
            }            
            courseData.id = idArray[id]
            tempArray.push(courseData)
        }
        return tempArray
    }

    function browseCourses(){
        props.setPage("browseCourses")
    }

  return (
    <div>                
        <div>
            <button onClick={browseCourses}>Browse Courses</button>
        </div>
        {courseDataArray(userCoursesArray()).map((course, index)=>(
            <div className='courseBox' key={"course"+index}>
                <div className='imageBox borderBox courseImageBox'>
                    <img src={course.imageUrl}></img>
                </div>                
                <div className='borderBox courseInfoBox'>
                    <div className='courseInfoTitle'>
                        {course.name}
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

export default UserCourses