import React from 'react'

function BrowseCourses(props) {

    function coursesArray(){
        //console.log("in browse courses")
        //console.log(props.coursesList)
        var tempArray = []
        for(var courseId in props.coursesList){
            //console.log(courseId)
            var courseDataObject = props.coursesList[courseId]
            courseDataObject.id = courseId
            tempArray.push(courseDataObject)
        }
        return tempArray
    }

    function enroll(course){

        // The enroll page is different depending on if there is a user signed in or not
        props.openEnrollPage(course.id)        

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