import React, { useEffect, useState } from 'react'
import "../Styles/Courses.css"
import BrowseCourses from "../Courses/BrowseCourses.js"
import Enroll from "../Courses/Enroll.js"
import UserCourses from "../Courses/UserCourses.js"
import ViewCourse from "../Courses/ViewCourse.js"
import EditCourse from "../Courses/EditCourse.js"
import {getDatabase, ref, set, onValue, push, get, remove, update} from "firebase/database"
import { connectAuthEmulator } from 'firebase/auth'

function Courses(props) {

    // State Variables
    const [courseId, setCourseId] = useState("course1")
    const [chapterId, setChapterId] = useState(null)
    const [sectionId, setSectionId] = useState(null)
    const [initialLoad, setInitialLoad] = useState(true)
    const [randomNumberState, setRandomNumberState] = useState(10)
    const [userCourseList, setUserCourseList] = useState([])
    
    // State Variables
    const [page, setPage] = useState("browseCourses")
    const [coursesList, setCoursesList] = useState({})
    const [courseData, setCourseData] = useState({})
    const [userData, setUserData] = useState({})  
    
    const [coursesData, setCoursesData] = useState({})

    // Get a reference to the database
    const database = getDatabase(props.app)   

    useEffect(()=>{

        // If there is a user signed in go to user courses initially
        if(props.userId != null)
            setPage("userCourses")

        // Get the courses list and user data from the db
        getCoursesList()

        // Get list of course id's of courses user is enrolled in


        // Gets all user data
        getUserData()

    },[])

    // Display functions
    function displayPage(){        
        if(page === "browseCourses")
            return <BrowseCourses 
                // For the back button
                setPage={setPage} 
                // This list is displayed
                coursesList={coursesList}
                // This is the action that can be taken on the courses in the list
                openEnrollPage={openEnrollPage}
            >            
            </BrowseCourses>
        if(page === "userCourses")
            return <UserCourses   
                // For the back button
                setPage={setPage} 
                // For continue course button
                goToCourse={goToCourse} 
                // The courses in user courses are displayed from the coursesList 
                userData={userData}
                // If there is no user signed in page changes to browseCourses
                userId={props.userId}
                // The elements in this list that match user course id's are displayed
                coursesList={coursesList}
            >
            </UserCourses>
        if(page === "enroll")
            return <Enroll 
                goToCourse={goToCourse} 
                courseId={courseId} 
                setPage={setPage}
                auth={props.auth}
                addCourse={addCourse}
                coursesData={coursesData}
                enrollInCourse={enrollInCourse}
                coursesList={coursesList}
                userId={props.userId}
            >
            </Enroll>
        if(page === "viewCourse")
            return <ViewCourse 
                courseData={courseData}
                coursesData={coursesData} 
                courseId={courseId} 
                chapterId={chapterId} 
                sectionId={sectionId} 
                setPage={setPage} 
                setChapterId={setChapterId} 
                setSectionId={setSectionId} 
                addChapter={addChapter} 
                addSection={addSection} 
                addElement={addElement} 
                randomNumberState={randomNumberState} 
                deleteChapter={deleteChapter} 
                deleteSection={deleteSection} 
                deleteElement={deleteElement}
                updateChapterName={updateChapterName}
                updateSectionName={updateSectionName}
                pathExists={pathExists}
                updateElement={updateElement}
                deleteContent={deleteContent}
                addContent={addContent}
                setSectionStep={setSectionStep}
                getSectionStep={getSectionStep}
                setElementStep={setElementStep}
                getElementStep={getElementStep}
            ></ViewCourse>
        if(page === "editCourse")
            return <EditCourse 
                coursesData={coursesData} 
                courseId={courseId} 
                chapterId={chapterId} 
                sectionId={sectionId} 
                setPage={setPage} 
                setChapterId={setChapterId} 
                setSectionId={setSectionId} 
                addChapter={addChapter} 
                addSection={addSection} 
                addElement={addElement} 
                randomNumberState={randomNumberState} 
                deleteChapter={deleteChapter} 
                deleteSection={deleteSection} 
                deleteElement={deleteElement}
                updateChapterName={updateChapterName}
                updateSectionName={updateSectionName}
                pathExists={pathExists}
                updateElement={updateElement}
                deleteContent={deleteContent}
                addContent={addContent}            
                courseData={courseData}    
            ></EditCourse>
    }  

    // Nav functions
    function openEnrollPage(_courseId){
        setCourseId(_courseId)
        setPage("enroll")
    }
    function goToCourse(_courseId, _page){        

        // Set Course
        setCourseId(_courseId)              

        // So there is no section or chapter selected to start
        setSectionId(null)
        setChapterId(null)

        // Get the data for the specified course
        onValue(ref(database, "cape-school/courseData/"+_courseId), snapshot=>{   
            
            var courseData = snapshot.val()
            
            setCourseData(courseData)       
            
            // Then get user data for this course
            onValue(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId), snapshot=>{
                
                // Get the user data and save it in state
                var userData = snapshot.val()
                setUserData(userData)

                // Look for the current chapter
                var currentChapter = userData.chapter                
                // If its undefined get the first one
                if(currentChapter == undefined)
                    currentChapter = getFirstChapter(courseData)

                // Look for the current section
                currentSection = userData.section                
                // If its not there get the first one
                if(currentSection == undefined)
                    var currentSection = getFirstSection(courseData, currentChapter)

                // Save the current chapter and section in state
                setChapterId(currentChapter)
                setSectionId(currentSection)

                // Set the page variable to go to the view or edit page
                setPage(_page)
            })
        })

        // Get user data such as progress and where they left off

        if(props.userId == null)
        return





    }    
    function enrollInCourse(_userId, _courseId){

        //console.log("enrolling "+_userId+" into "+_courseId)

        // Put it in a list of courses the user is in
        update(ref(database, "/cape-school/users/"+props.userId+"/courseList/"+_courseId), {
            enrolled:true
        }).then(()=>{
            
            // Load the course data to be viewed in the view course page
            getCourseData(_courseId)
        
            // After course is added to user data in db, go to view course
            goToCourse(_courseId, "viewCourse")            

        })

        // Put the course in the user data in the db
        update(ref(database, "/cape-school/users/"+props.userId+"/courses/"+_courseId), {
            enrolled:true
        })
        
    }

    function getFirstChapter(_courseData){                   
        for(var id in _courseData.chapters){
          return id
        }    
        return null
    }  
    function getFirstSection(_courseData, _chapterId){    
        for(var id in _courseData.chapters[_chapterId].sections){
            return id
        }
        return null
    }

    // Get from db functions    
    function getCoursesList(){
        onValue(ref(database, "cape-school/courses"), snapshot=>{
            //console.log("courses List: ")
            //console.log(snapshot.val())
            setCoursesList(snapshot.val())
        })
    }    
    function getCourseData(_courseId){        
        onValue(ref(database, "cape-school/courseData/"+_courseId), snapshot=>{   
            setCourseData(snapshot.val())            
        })
    }
    function getUserData(){
        
        if(props.userId == null)
            return

        onValue(ref(database, "cape-school/users/"+props.userId), snapshot=>{
            setUserData(snapshot.val())
        })
    }
    // Load userCourseList from "cape-school/users/"+userId+"/courseList"
    function getUserCourseList(){        
        onValue(ref(database, "cape-school/users/"+props.userId+"/courseList"), snap=>{
            var tempArray = []
            var courseListJson = snap.val()
            for(var courseId in courseListJson)
                tempArray.push(courseId)
            setUserCourseList(tempArray)
        })
    }


    // Firebase course functions
    function newCourse(){
        var newRef = push(ref(database, "cape-school/courses"))
        
        set(newRef, {
            name:"This is a new course",
            imageUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=",
            description:"This is the description of the first course",
            admin:props.userId,
        }).then(()=>{
            //console.log("uploading course Data")
            set(ref(database, "cape-school/courseData/"+newRef.key),{
                name:"This is a new course",
                admin:props.userId,
                chapters:{
                    chapter1:{
                        title:"this is chapter 1",
                        sections:{
                            section1:{
                                title:"this is section 1",
                                elements:{
                                    element1:{
                                        title:"this is element 1",
                                        type:"title",
                                        content:["part 1", "part 2"],
                                        description:"this is a description"                                    
                                    }
                                }
                            }
                        }
                    }
                }
            }).then(()=>{
                //console.log("opening new course")
                goToCourse(newRef.key, "editCourse")
            })
        })
    }
    function deleteCourse(_courseId){
        remove(ref(database, "cape-school/coursesList/"+_courseId))
        remove(ref(database, "cape-school/coursesData/"+_courseId))
    }


    // ==== ==== // \\ Old functions // \\ ==== ==== \\

    function setUpDbListeners(){
        
        const coursesRef = ref(database, "/cape-school/courses/")

        onValue(coursesRef, snapshot=>{
            //console.log("courses data from db:")
            //console.log(snapshot.val())
            setCoursesList({courses:snapshot.val()})
        })
        
        onValue(ref(database, "/cape-school/users/"+props.userId), snapshot=>{
            //console.log("user data from db:")
            //console.log(snapshot.val())
            
            if(snapshot.val() != null)
                setUserData(snapshot.val())

            // If there is no course data add it
            // it should be added when user enrolls in course though
        })
       
    }
    function loadCourseList(){        

        const courseDataRef = ref(database, "/cape-school/courseData/"+courseId)

        onValue(courseDataRef, snapshot=>{
            setCoursesList({courses:snapshot.val()})
        })
    }

    function uploadInitialUserData(){
        //console.log("attemptint to upload data")
        set(ref(database, "cape-school/users/"+props.userId),userData)
        .then(message=>{
            //console.log(message)
        })
        .catch(err=>{
            //console.log(err)
        })
    }

    function uploadInitialCourseData(){
        //console.log("attemptint to upload data")
        set(ref(database, "cape-school/courseData/"),coursesData.courses)
        .then(message=>{
            //console.log(message)
        })
        .catch(err=>{
            //console.log(err)
        })
    }
    var courses = {
        course1:{
            name:"this is the first course",
            imageUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=",
            description:"this is the description of the first course",
        },
        course2:{
            name:"this is the second course",
            imageUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=",
            description:"this is the description of the first course",
        },
    }
    function putCoursesInDb(){
        set(ref(database, "cape-school/courses"), courses)
    }



    // Add functions
    function addCourse(){
        var newCourseId = "course"+Math.random(0,10000)
        courseId.courses[newCourseId] = {
            name:"New Course",
            chapters:{
                chapter1:{
                    name:"New chapter",
                    sections:{
                        section1:{
                            name:"new section",
                            elements:{
                                element1:{
                                    title:"First Element",
                                    content:["add content here"]
                                }
                            }
                        }

                    }

                }
            }
        }
    }
    function addChapter(){
        // Create a chapter name
        var newChapterId = "chapter"+randomNumber()
        ensurePath(newChapterId)        
        setRandomNumberState(randomNumber())
    }
    function addSection(_chapterId){
        
        // Create a new id
        var newSectionId = "section"+randomNumber()
        
        ensurePath(_chapterId, newSectionId)

        setRandomNumberState(randomNumber())
    }
    function addElement(_chapterId, _sectionId){        
        
        // Create a new id
        var newElementId = "element"+randomNumber()

        ensurePath(_chapterId, _sectionId, newElementId)

        setRandomNumberState(randomNumber())
    }
    function addContent(_chapterId, _sectionId, _elementId){        
        if(pathExists(_chapterId, _sectionId, _elementId)){
            coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].content.push("new content")
            updateDom()
        }
    }

    // Update functinos
    function updateChapterName(_chapterId, newName){
        if(pathExists(_chapterId)){
            var tempCoursesData = coursesData
            tempCoursesData.courses[courseId].chapters[chapterId].title = newName
            setCoursesData(tempCoursesData)
            updateDom()
        }
    }
    function updateSectionName(_chapterId, _sectionId, newName){        
        if(pathExists(_chapterId, _sectionId)){
            var tempCoursesData = coursesData
            tempCoursesData.courses[courseId].chapters[chapterId].sections[_sectionId].title = newName
            setCoursesData(tempCoursesData)  
            updateDom()
        }         
    }
    // Takes in 2 ids and a JSON object, checks or creates path, sets value
    function updateElement(_chapterId, _sectionId, _elementId, elementData){
        if(pathExists(_chapterId, _sectionId, _elementId)){
            var tempCoursesData = coursesData
            tempCoursesData.courses[courseId].chapters[chapterId].sections[_sectionId].elements[_elementId] = elementData
            setCoursesData(tempCoursesData)  
            updateDom()
        }     
    }

    // Delete functions
    function deleteChapter(_chapterId){
        if(pathExists(_chapterId)){
            var tempCoursesData = coursesData
            delete(tempCoursesData.courses[courseId].chapters[_chapterId])
            setCoursesData(tempCoursesData)
            setChapterId(null)
            setSectionId(null)
            setRandomNumberState(randomNumber())
        }
    }
    function deleteSection(_chapterId, _sectionId){
        if(pathExists(_chapterId, _sectionId)){
            var tempCoursesData = coursesData
            delete(tempCoursesData.courses[courseId].chapters[_chapterId].sections[_sectionId])
            setCoursesData(tempCoursesData)
            setChapterId(null)
            setSectionId(null)
            setRandomNumberState(randomNumber())
        }
    }
    function deleteElement(_chapterId, _sectionId, _elementId){        
        if(pathExists(_chapterId, _sectionId, _elementId)){
            var tempCoursesData = coursesData
            delete(tempCoursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId])
            setCoursesData(tempCoursesData)
            setRandomNumberState(randomNumber())
        }
    }    
    // Content Functions
    function deleteContent(_chapterId, _sectionId, _elementId, index){
        if(pathExists(_chapterId, _sectionId, _elementId)){
            coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].content.pop(index)
            updateDom()
        }
    }

    // Step Functions
    function getSectionStep(_chapterId, _sectionId){
                
        if(_chapterId == null || _sectionId == null)
            return 0

        var returnStep = 0
        
        if(userDataEnsurePath(_chapterId, _sectionId)){
            returnStep = userData.courses[courseId].chapters[_chapterId].sections[_sectionId].step
            
            if(returnStep === undefined)                
                returnStep = 0            
        }
                
        return returnStep
    }    
    function setSectionStep(_chapterId, _sectionId, step){
        
        if(userDataEnsurePath(_chapterId, _sectionId)){
            var tempUserData = userData
            tempUserData.courses[courseId].chapters[_chapterId].sections[_sectionId].step = step
            //setUserData(tempUserData)            
        }

    }
    // Element Steps
    function setElementStep(_chapterId, _sectionId, _elementId, step){                

        if(userDataEnsurePath(_chapterId, _sectionId, _elementId)){
            var tempUserData = userData
            tempUserData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].step = step            
            //setUserData(tempUserData)                    
        }

    }
    function getElementStep(_chapterId, _sectionId, _elementId){                        

        if(_chapterId == null || _sectionId == null || _elementId == null)
            return 0

        var returnStep = 0
        
        if(userDataEnsurePath(_chapterId, _sectionId, _elementId)){            
            returnStep = userData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].step
            
            if(returnStep === undefined)                
                returnStep = 0            
        }
                
        ////console.log("returning step : "+returnStep +" for "+courseId+_chapterId + _sectionId + _elementId)        
        return returnStep
    }


    // Helper functions
    function updateDom(){
        setRandomNumberState(randomNumber())
    }
    function randomNumber(){
        return Math.floor( Math.random()*1000)
    }
    // Course Data
    function ensurePath(_chapterId, _sectionId, _elemetId){

        if(_chapterId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId] === undefined){
                var newCourseData = coursesData
                newCourseData.courses[courseId].chapters[_chapterId] = 
                {
                    title:"New Chapter",
                    sections:{
                        section1:{
                            title:"New Section",
                            elements:{
                                element1:{            
                                    title:"New Element",
                                    type:"text",
                                    content:["add content here"]
                                }
                            }
                        }
                    }
                }
                setCoursesData(newCourseData)
                return            
            }
        if(_sectionId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId] === undefined){
                var newCourseData = coursesData
                newCourseData.courses[courseId].chapters[_chapterId].sections[_sectionId] = {
                    title:"new section", 
                    elements:{
                        element1:{            
                            title:"New Element",
                            type:"text",
                            content:["add content here"]
                        }
                    }
                }
                setCoursesData(newCourseData)
                return
            
            }
        if(_elemetId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elemetId] === undefined){
                var newCourseData = coursesData
                newCourseData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elemetId] = {                                                      
                            title:"New Element",
                            type:"text",
                            content:["add content here"]                        
                }
                // Here modifying the course data and uploading the whole thing
                set(ref(database, "cape-school/courses/"+courseId), newCourseData.courses[courseId])

                //setCoursesData(newCourseData)

                // Would be a lot better to add at the specific point

                // and only have to onValue specific part that changes

                // Or maybe not even have to onvalue, can change in db by uploading what is needed and change local state

                // When pressing save local state could be uploaded to make sure

                // This way realtime changes could be done efficiently

                return
            }
    }
    function pathExists(_chapterId, _sectionId, _elemetId){        

        //console.log("coursesData.courses["+courseId+"].chapters["+_chapterId+"]")
        //console.log(coursesData)
        if(coursesData.courses[courseId].chapters[_chapterId] === undefined)
            return false            
        
        //console.log("coursesData.courses["+courseId+"].chapters["+_chapterId+"].sections["+_sectionId)
        if(_sectionId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId] === undefined)
                return false

        if(_elemetId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elemetId] === undefined)
                return false
        
        return true
    }
    // User Data
    function userDataEnsurePath(_chapterId, _sectionId, _elementId){                     

        //console.log("ensuring path "+_chapterId+" "+_sectionId+" "+_elementId)

        // // If all three are specified and chapter is not present (so none are present)
        // if(_sectionId != undefined && _sectionId != undefined && _elemetId != undefined)
        //     if(userData.courses[courseId].chapters[_chapterId] === undefined){
        //         var newUserData = userData
        //         newUserData.courses[courseId].chapters[_chapterId]={
        //             sections:
        //             {
        //                 [sectionId]:{
        //                     elelemts:{
        //                         [_elemetId]:{

        //                         }
        //                     }

        //                 }
        //             }
        //         }
                
        //         //setUserData(newUserData)
        //         return false
        //     }

        // // If all three are specified and section and element are both not present
        // // If all three are specified and chapter is not present (so none are present)
        // if(_sectionId != undefined && _sectionId != undefined && _elemetId != undefined)
        //     if(userData.courses[courseId].chapters[_chapterId] === undefined){
        //         var newUserData = userData
        //         newUserData.courses[courseId].chapters[_chapterId].sections[_sectionId]=                
        //             {
        //                 elelemts:{
        //                     [_elemetId]:{

        //                     }
        //                 }
        //             }
        //         //setUserData(newUserData)
        //         return false
        //     }

        if(userData === undefined || userData.courses[courseId] === undefined){
            //console.log("undefined course data")
            return
        }

        if(userData === undefined || userData.courses[courseId].chapters === undefined){
            //console.log("no chapters in user course data")
            return
        }

        // If only the cahpter is specified and its not there
        if(_chapterId != undefined)   
            if(userData.courses[courseId].chapters[_chapterId] === undefined){
                var newUserData = userData
                newUserData.courses[courseId].chapters[_chapterId] = 
                {                   
                    sections:{                        

                    }
                }
                //setUserData(newUserData)                
                return false
            }

        // If chapter and section are specified and section is not present
        if(_sectionId != undefined)
            if(userData.courses[courseId].chapters[_chapterId].sections[_sectionId] === undefined){
                var newUserData = userData
                newUserData.courses[courseId].chapters[_chapterId].sections[_sectionId] = {                    
                    elements:{
                        
                    }
                }
                //setUserData(newUserData)
                return false
            }
        
        // If all three are specified and only element is not present
        if(_elementId != undefined)
            if(userData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId] === undefined){
                var newUserData = userData
                newUserData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId] = {}
                //setUserData(newUserData)
                return false
            }
        
        
        //console.log("found path")


        // Returns true if path already existed
        return true
    }
    function userDataPathExists(_chapterId, _sectionId, _elemetId){
        return false

    }
    function addCourse(_courseId){        
        var tempUserData = userData
        if(tempUserData.courses[_courseId]=== undefined)
        tempUserData.courses[_courseId] = {}
        //setUserData(tempUserData)
    }




    return (
    <div className='page' key={page}>
        {/* <button onClick={setUpDbListeners}>Upload Initial Data</button> */}
        {displayPage()}
        <div>
            <button onClick={newCourse}>Course Function</button>
        </div>
    </div>
  )
}

export default Courses