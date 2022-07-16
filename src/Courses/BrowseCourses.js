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
                <a className='button bottomButton courseButton' onClick={()=>props.goToCourse(course.id,"enroll")}>View Details / Enroll</a>                
            </div>
        </div>
        ))}
        
    </div>
  )
}

export default BrowseCourses