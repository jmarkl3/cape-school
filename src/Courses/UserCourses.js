import { checkActionCode } from 'firebase/auth'
import React, { useEffect } from 'react'

function UserCourses(props) {

    useEffect(()=>{
        console.log("usercourses props.userId")
        console.log(props.userId)
        if(props.userId == null)
            props.setPage("browseCourses")
    },[])

    function coursesArray(){
        var tempArray = []
        for(var courseId in props.coursesData.courses){
            var courseDataObject = props.coursesData.courses[courseId]
            courseDataObject.id = courseId
            tempArray.push(courseDataObject)
        }
        return tempArray
    }

    // Returns an array with the ids of each course the user is in
    function userCoursesArray(){
        if(props.userData == null){
            console.log("In UserCourses.js coursesArray: there is no user data:") 
            console.log(props.userData)           
            return []
        }
        var tempArray = []
        for(var userCourseId in props.userData.courses){
            
            tempArray.push(userCourseId)
        }
        
        console.log("userCourseArray: ")
        console.log(tempArray)

        return tempArray
    }
    
    // Takes an array of course ids and returns an array of course data for each one
    function courseDataArray(idArray){
        var tempArray = []
        for(var id in idArray){
            if(props.coursesData.courses == undefined){
                console.log("undefined course data: ")
                console.log(props.coursesData)
                continue
            }

            var courseData = props.coursesData.courses[idArray[id]]            
            if(courseData === undefined){
                courseData = {}
                courseData.name = "Course not found"
            }            
            courseData.id = idArray[id]
            tempArray.push(courseData)
        }
        return tempArray
    }

  return (
    <div>                
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