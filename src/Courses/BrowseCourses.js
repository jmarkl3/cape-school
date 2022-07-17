import React from 'react'

function BrowseCourses(props) {
    
    function coursesArray(){
        var tempArray = []
        for(var courseId in props.coursesData.courses){
            var courseDataObject = props.coursesData.courses[courseId]
            courseDataObject.id = courseId
            tempArray.push(courseDataObject)
        }
        return tempArray
    }

    function enroll(course){
        // If there is no user signed in
        if(props.userId == null)
            props.goToCourse(course.id,"enroll")
        //else
            //props.enrollUser(courseId)

        // If there is a user signed in add the course to their user data and go to view course page

    }

  return (
    <div>        
        {coursesArray().map(course=>(
            <div className='courseBox'>
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
                <a className='button bottomButton courseButton' onClick={()=>enroll(course)}>View Details / Enroll</a>                
            </div>
        </div>
        ))}
        
    </div>
  )
}

export default BrowseCourses