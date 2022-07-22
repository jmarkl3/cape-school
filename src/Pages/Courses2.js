import React, { useEffect, useState } from 'react'
import BrowseCourses2 from '../Courses/BrowseCourses2'
import {getDatabase, set, push, onValue, ref, update, remove} from "firebase/database"
import Enroll from '../Courses/Enroll2'
import { checkActionCode } from 'firebase/auth'

function Courses2(props) {
  

    // ============================================================
    // |
    // |    1) Variables and Init
    // |    2) Display Functions
    // |    3) Loading (Courses)
    // |    3) Loading (User)    
    // |    4) Add Update & Delete (Courses)
    // |    4) Add Update & Delete (User)
    // |
    // |    
    // ============================================================
    
    /*
        
        Tasks
        Add course
        delete course

        edit course button allows courses to be edited
          add button, connect to function, create function, set state variable, display input depending on state
        
        save button saves data from course edit
          function in courses2.js that takes inputs and updates db, send function to browseCourses, create button, call function from button

          view/enroll button on browse courses opens enroll new user page
            function in courses2.js gathers and sets data, function is called from browse courses, enroll page displays data

        //a/p/p/l/e
        //aphid
    */

    //\\// ============================== ============================== Variables and Init ============================== ============================== \\//\\
    // #region
    
    const [page, setPage] = useState("browseCourses")
    const [coursesList, setCoursesList] = useState([])
    const [courseId, setCourseId] = useState([])
    const database = getDatabase(props.app)  

    useEffect(()=>{
                
        loadCourseList()

    },[])

    // #endregion

    //\\// ============================== ============================== Display functions ============================== ============================== \\//\\
    // #region
    
    function displayPage(){
        if(page == "browseCourses")
            return (
                <BrowseCourses2
                    createCourse={createCourse}
                    coursesList={coursesList}
                    openEnrollPage={openEnrollPage}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                ></BrowseCourses2>
            )
        if(page == "enroll")
            return(
                <Enroll
                    courseId={courseId}
                    enrollUser={enrollUser}
                    courseListData={courseListData}
                    setPage={setPage}
                    userId={props.userId}
                ></Enroll>
            )
    }
    function openEnrollPage(_courseId){
        // Set the course id
        setCourseId(_courseId)

        // Set page state so enroll page shows
        setPage("enroll")

    }
    function viewCourse(_courseId){
        
    }
    function editCourse(_courseId){

    }

    // #endregion
    
    //\\// ============================== ============================== Add Update & Delete (Courses) ============================== ============================== \\//\\    
    // #region 

    //\\// ===== ===== Add functions ===== ===== \\//\\
        
    function createCourse(){
        var newCourseRef = push(ref(database, "cape-school/courses"))
        update(ref(database, "cape-school/courses/"+newCourseRef.key), {enrolled:true})
        update(ref(database, "cape-school/courseList/"+newCourseRef.key), 
            {
                title:"New Course",
                description:"It was created in the create course funciton",
                imageUrl:"http://www.destination360.com/north-america/us/wyoming/images/s/jackson.jpg",
                cost:129,
                prevCost:349,
            }
        )
    }

    //\\// ===== ===== Update functions ===== ===== \\//\\

    function updateCourse(_courseId, _title, _description){
        update(ref(database, "cape-school/courseList/"+_courseId), {
            title:_title,
            description:_description
        })
        update(ref(database, "cape-school/courses/"+_courseId), {
            title:_title,
            description:_description
        })
    }


    //\\// ===== ===== Delete functions ===== ===== \\//\\
    function deleteCourse(_courseId){
        remove(ref(database, "cape-school/courses/"+_courseId))
        remove(ref(database, "cape-school/courseList/"+_courseId))
    }

    function addChapter(){

    }
    function addSection(){

    }
    function addElement(){

    }
    
    // #endregion

    //\\// ============================== ============================== Add Update & Delete (User) ============================== ============================== \\//\\    
    // #region 
        
    function enrollUser(_userId, _courseId){
        if(_userId == null)
            return
        // Put the course in their course list and also create an entry in the courseData section
        update(ref(database, "cape-school/users/"+_userId+"/courseList/"+_courseId), true)
        update(ref(database, "cape-school/users/"+_userId+"/courseData/"+_courseId), {enrolled:true})
    }
    
    // #endregion
    

    //\\// ============================== ============================== Loding (Courses)============================== ============================== \\//\\
    // #region 
    
    function loadCourseList(){  
        onValue(ref(database, "cape-school/courseList"), snap=>{
            var tempCoursesArray = []
            var tempCourseObject = snap.val()
            for(var courseId in tempCourseObject){
                var tempCourse = tempCourseObject[courseId]
                tempCourse.id = courseId
                tempCoursesArray.push(tempCourse)
            }            
            setCoursesList(tempCoursesArray)                        
        })

    }    
    function courseListData(_courseId){
        var returnValue = {}
        coursesList.forEach(course=>{            
            if(course.id === _courseId)
                // For some reason can't just return it, need to put in this temp variable and return it after
                returnValue = course            
        })
        return returnValue
    }    
    function loadCourseData(_courseId){

    }

    // #endregion

    //\\// ============================== ============================== Loding (User)============================== ============================== \\//\\
    // #region 

    // Loads user's data for this course
    function loadUserCourseData(_courseId){

    }
    // Loads a list of all the corses. Includes basic info such as name, image url, description, price. Puts an array in state

    // Loads a list of all the courses the user is enrolled in
    function loadUserCourseList(){

    }

    // #endregion


    return (
    <div>
        {displayPage()}
    </div>
  )
}

export default Courses2