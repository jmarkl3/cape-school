import React, { useEffect, useState } from 'react'
import BrowseCourses2 from '../Courses/BrowseCourses2'
import {getDatabase, set, push, onValue, ref, update, remove} from "firebase/database"
import Enroll from '../Courses/Enroll2'
import { checkActionCode } from 'firebase/auth'
import UserCourses2 from '../Courses/UserCourses2'

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

        view courses that user is enrolled in
          function that returns list of course ids that correspond with courses user is enrolled in 
          function that returns sublist of course list based on list of courses user is enrolled in
          open UserCourses.js and display that list          

        create userInCourse(courseId) function to determine if user is enrolled in given course so browseCourses can display different buttons in that case
          would want to have userCourseList loaded first so when rendering browseCourses after, maybe don't need to switch this actually

        edit course
          when editCourse(courseId) function is called the courseId is saved and the page is set to editCourse2
          course data is displayd in a sidebar and main viewing section
          chapter and section are set from user data or from first if no user data is found


        //a/p/p/l/e
        //aphid
    */

    //\\// ============================== ============================== Variables and Init ============================== ============================== \\//\\
    // #region
    
    const [page, setPage] = useState("userCourses")
    const [courseList, setCourseList] = useState([])
    const [userCourseList, setUserCourseList] = useState([])
    const [courseId, setCourseId] = useState([])
    const database = getDatabase(props.app)  

    useEffect(()=>{
                
        loadCourseList()
        
        if(props.userId != null)
            setPage("userCourses")

    },[])

    // #endregion

    //\\// ============================== ============================== Display functions ============================== ============================== \\//\\
    // #region
    
    function displayPage(){
        if(page == "browseCourses")
            return (
                <BrowseCourses2
                    createCourse={createCourse}
                    courseList={courseList}
                    openEnrollPage={openEnrollPage}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    userId={props.userId}
                    setPage={setPage}
                    userIsInCourse={userIsInCourse}
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
        if(page == "userCourses")
            return(
                <UserCourses2
                    userId={props.userId}
                    setPage={setPage}
                    userCourseList={userCourseList}    
                                                    
                ></UserCourses2>                
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
        set(ref(database, "cape-school/users/"+_userId+"/courseList/"+_courseId), true)
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
            setCourseList(tempCoursesArray)    
            loadUserCourseList(tempCoursesArray)                    
        })

    }    
    function courseListData(_courseId){
        var returnValue = {}
        courseList.forEach(course=>{            
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
    // Loads a list of all the coruses. Includes basic info such as name, image url, description, price. Puts an array in state

    // Loads a list of all the courses the user is enrolled in
    function loadUserCourseList(_courseList){

        if(props.userId == null)
            setUserCourseList([])

        // This will require that the courseList is creaed already, else there sill be no foreach. 
        // Will probably be called in useEffect initially before courseList state is updated, then needs to be called again after
        onValue(ref(database, "cape-school/users/"+props.userId+"/courseList"), snap=>{
            var userCourseIdList = snap.val()
            var tempUserCourseList = []
            for(var courseId in userCourseIdList)
                _courseList.forEach(course=>{
                    if(course.id == courseId)
                        tempUserCourseList.push(course)                    
                })
            setUserCourseList(tempUserCourseList)
        })
        
    }

    function userIsInCourse(_courseId){
        var returnValue = false
        console.log("checking to see if user is in course "+_courseId)
        userCourseList.forEach(course=>{
            console.log("checking course "+course.id)
            if(course.id == _courseId)
                returnValue = true
        })
        return returnValue
    }

    // #endregion


    return (
    <div>
        {displayPage()}
    </div>
  )
}

export default Courses2