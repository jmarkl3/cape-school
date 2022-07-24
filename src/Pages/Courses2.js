import React, { useEffect, useState } from 'react'
import BrowseCourses2 from '../Courses/BrowseCourses2'
import {getDatabase, set, push, onValue, ref, update, remove} from "firebase/database"
import Enroll from '../Courses/Enroll2'
import { checkActionCode } from 'firebase/auth'
import UserCourses2 from '../Courses/UserCourses2'
import EditCourse2 from '../Courses/EditCourse2'
import ViewCourse2 from '../Courses/ViewCourse2'

function Courses2(props) {
  

    // ============================================================
    // |
    // |    1)   Variables and Init
    // |    2)   Display Functions
    // |    3)   Loading (Courses)
    // |    3.2) Loading (User)    
    // |    4)   Add Update & Delete (Courses)
    // |    4.2) Add Update & Delete (User)    
    // |    5)   Helper Functions 
    // |    
    // ============================================================
    
    /*

====================
               Tasks
====================

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

        show edit course page
        
        show sideMenu on editCourse page
        
        load chapter list into state variable with function
        show chapter liston sidemenu of edit course page

        add a chapter with add chapter button on sidemenu
        and display the added chapter in side menu

        display sections under chapter        
            
        
        setChapterId when chapter is clicked in sideMenu

        add section in edit course sidemenu
            will need a chapterId to be set
            this should upate the side menu

        setSectionId from sidebar
        
        add Element from sidebar

        display chapters and sections as buttons
        hilight selected chapter
        hilight selected section
                
        create chapter and section update and delete functions
        call then from EditCourse2.js
        

        /chapters or /chapterData ?
            what does courses, sections, and elements use?
            under chapters there are sections, not sectionData and there is no sectionList, maybe will go with courseList courses and  chapterList and chapters

        display elements in EditCourse2.js page
          loadSectionData and put it in state
          send to editCourse2.js and map it

        element functions (add, update, delete)
            and page refreshes when element is deleted, called load elements again as .then of delete from db function

        element content functions (add, delete)
        
        all element types display (title, quiz, text, image, video)

        viewCourse elements display
        
        viewCourse functionality
        next button increaces a counter
        content shows based on counter number        
        button displays conditionally based on counter and number of content lines
        elements display based on viewCourse couter step
        viewCourse step goes up when element counter reached top

        userData (section step) saves into db when user clicks continue
        section step loads from db when section when section is pressed in sidebar
        step that is loaded from db is reflected on viewCorse page


        element step or elements up to loaded step display as complete

        *        

        questions
        question answers can be selected
        question answer submitted when submit button is pressed
        question css changes based on correct or not    
        question answers saved to db
        question answer loaded from db
        answer selection loaded from db and displayed
        
        bug: when switching from one section to another element step persists into an unrelated element        
        
        save position to db
        load position from db
        display loaded position
        start from first chapter and first section if there is none saved

        payment screen

====================
        Useful Info:
====================

        Course db structure: 

        courseId:{
            chapterList:{
                chapter1Id:{
                    title:"chapter 1 title"
                    sections:{
                        section1Id: "chapter 1 section 1 title",
                        section2Id: "chapter 1 section 2 title"
                    }
                },
                chapter2Id:{
                    title:"chapter 2 title"
                    sections:{
                        section1Id: "chapter 2 section 1 title",
                        section2Id: "chapter 2 section 2 title"
                    }
                }
            },
            chapterData:{
                chapter1Id:{
                    title:"chapter 1 title"
                    sections:{
                        section1Id: {
                            title:"chapter 1 section 1 title",
                            elements:{...}
                        }
                        section2Id: "chapter 1 section 2 title"
                    }
                },
            }
        }
        
        users{
            userId:{
                info:info,
                courses:{
                    courseId:{
                        chapters:{
                            chapterId:{
                                complete:true
                                sections:{
                                    sectionId:{
                                        complete:true
                                        step:stepNumber
                                        elements:{
                                            elementId:stepNumber
                                        }
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
        
        //a/p/p/l/e
        //aphid

    */




    //\\// ============================== ============================== Variables and Init ============================== ============================== \\//\\
    // #region
    
    const [page, setPage] = useState("userCourses")
    const [courseList, setCourseList] = useState([])
    const [userCourseList, setUserCourseList] = useState([])
    const [courseId, setCourseId] = useState(null)
    const [chapterId, setChapterId] = useState(null)
    const [sectionId, setSectionId] = useState(null)    
    const [chapterList, setChapterList] = useState([])
    const [elementsArray, setElementsArray] = useState([])    
    const [sectionPosition, setSectionPosition] = useState(0)
    const [chapterPosition, setChapterPosition] = useState(0)
    const [viewStep, setViewStep] = useState(0)
    const [refresh, setRefresh] = useState(0)

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
                    goToCourse={goToCourse}             
                ></UserCourses2>                
            )
        if(page === "editCourse")
            return (
                <EditCourse2
                    chapterList={chapterList}
                    addChapter={addChapter}
                    setChapterId={setChapterId}
                    addSection={addSection}
                    setSection={setSection}
                    addElement={addElement}
                    sectionId={sectionId}
                    chapterId={chapterId}
                    updateChapterTitle={updateChapterTitle}
                    deleteChapter={deleteChapter}
                    updateSectionTitle={updateSectionTitle}
                    deleteSection={deleteSection}
                    loadElements={loadElements}
                    elementsArray={elementsArray}                    
                    deleteElement={deleteElement}    
                    refresh={refresh}        
                    updateElement={updateElement}
                    addContent={addContent}
                    deleteContent={deleteContent}
                    setPage={setPage}                                       

                ></EditCourse2>
            )
        if(page === "viewCourse")
            return(
                <ViewCourse2
                    chapterList={chapterList}                    
                    setChapterId={setChapterId}                                        
                    setSection={setSection}                  
                    sectionId={sectionId}
                    chapterId={chapterId}                                                            
                    loadElements={loadElements}
                    elementsArray={elementsArray}                                        
                    refresh={refresh}         
                    setPage={setPage}          
                    loadUserData={loadUserData}      
                    saveStep={saveStep}        
                    loadStep={loadStep}    
                    viewStep={viewStep}    
                    savePosition={savePosition}
                ></ViewCourse2>
            )


    }
    function openEnrollPage(_courseId){
        // Set the course id
        setCourseId(_courseId)

        // Set page state so enroll page shows
        setPage("enroll")

    }
    // This sets the value directly, it would have to be sent to enroll2.js as a prop instead of the getCourseDaat function 
    function openEnrollPage2(_course){
        setCourseId(_course.id)
        //setCourseData(_course)
        setPage("enroll")
    }
    function goToCourse(_courseId, page){

        setCourseId(_courseId)
        loadChapterList(_courseId)
        setPage(page)
        loadPosition(_courseId)
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
    function loadChapterList(_courseId){
        onValue(ref(database, "cape-school/courses/"+_courseId+"/chapterList"), snap=>{
            // This is where the array of jsons will be stored for return
            var tempChapterArray = []

            // Go through the json and add each chapter
            var chapterListObj = snap.val()
            for(var chapterObjId in chapterListObj){
                // Get the chapter json
                var tempChapter = chapterListObj[chapterObjId]
                // Add the id as a key:value
                try{tempChapter.id = chapterObjId}                 
                catch{}
                
                // Get all the sections and map them to an array
                var tempSectionsArray = []
                for(var sectionId in chapterListObj[chapterObjId].sections){
                    // Get the section json
                    var tempSection = chapterListObj[chapterObjId].sections[sectionId]
                    // Add the id to it
                    try{tempSection.id = sectionId} 
                    catch{}
                    tempSectionsArray.push(tempSection)
                }
                    
                // There is currently an objects whos values are the sections
                tempChapter.sections = tempSectionsArray
                
                // Save the chapter in the temp array
                tempChapterArray.push(tempChapter)
            }

            setChapterList(tempChapterArray)

        })
    }
    function loadElements(_chapterId, _sectionId){
        
        var tempElementsArray = []

        if(nou(chapterId) || nou(sectionId))
            setElementsArray(tempElementsArray)

        onValue(ref(database, "cape-school/courses/"+courseId+"/chapters/"+_chapterId+"/sections/"+_sectionId+"/elements"), snap=>{
            var elements = snap.val()
            
            for(var elementId in elements){
                var tempELement = elements[elementId]
                tempELement.id = elementId
                tempElementsArray.push(tempELement)
            }
            setElementsArray(tempElementsArray)
            setRefresh(refresh+1)
        })


    }

    // #endregion

    //\\// ============================== ============================== Loding (User)============================== ============================== \\//\\
    // #region 

    function loadUserData(_chapterId, _sectionId){
        onValue(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/chapters/"+_chapterId+"/sections/"+_sectionId), snap=>{            
            //setUserSectionData(snap.val())            
        })
    }

    function loadStep(_chapterId, _sectionId){
        // Set it to 0 initially for when switching sections because of flashing ahead
        setViewStep(0)
        onValue(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/chapters/"+_chapterId+"/sections/"+_sectionId+"/step"), snap=>{                      
            var tempViewStep = snap.val()
            if(tempViewStep == undefined)
                tempViewStep = 0
            setViewStep(tempViewStep)
        })
    }

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
        userCourseList.forEach(course=>{
            if(course.id == _courseId)
                returnValue = true
        })
        return returnValue
    }

    function loadPosition(_courseId){
        onValue(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId+"/position"), snap=>{
            if(snap.val()!= undefined){
                setChapterPosition(snap.val().chapter)
                setSectionPosition(snap.val().section)
            }
            else{
                // get first chapter and section
            }
        })
        setSectionPosition()
    }

    // #endregion




    //\\// ============================== ============================== Add Update & Delete (Courses) ============================== ============================== \\//\\    
    // #region 

    //\\// ===== ===== Course functions ===== ===== \\//\\
        
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
    
    function deleteCourse(_courseId){
        remove(ref(database, "cape-school/courses/"+_courseId))
        remove(ref(database, "cape-school/courseList/"+_courseId))
    }

    function setSection(_chapterId, _sectionId){
        setChapterId(_chapterId)
        setSectionId(_sectionId)
    }
    
    //\\// ===== ===== Chapter functions ===== ===== \\//\\

    function addChapter(){
        var newRef = push(ref(database, "cape-school/courses/"+courseId+"/chapterList"))        
        var newChapter = {
            title:"New Chapter",
            sections:{
                section1:{
                    title:"Section One"                    
                }
            }
        }
        set(ref(database, "cape-school/courses/"+courseId+"/chapterList/"+newRef.key), newChapter)
        set(ref(database, "cape-school/courses/"+courseId+"/chapters/"+newRef.key), newChapter)

    }
    function updateChapterTitle(newTitle){        
        if(nou(chapterId))
            return
        update(ref(database, "cape-school/courses/"+courseId+"/chapterList/"+chapterId), {title:newTitle})
        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId), {title:newTitle})
    }
    function deleteChapter(){
        if(nou(chapterId))
            return
        remove(ref(database, "cape-school/courses/"+courseId+"/chapterList/"+chapterId))
        remove(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId))
    }


    //\\// ===== ===== Section functions ===== ===== \\//\\
    function addSection(){
                
        if(chapterId == null || chapterId == undefined)        
            // Can try to look for first chapter in selected course first
            return

        var newRef = push(ref(database, "cape-school/courses/"+courseId+"/chapterList/"+chapterId+"/sections"))        
        var newSection = {
                title:"New Section",            
            }
        
        set(ref(database, "cape-school/courses/"+courseId+"/chapterList/"+chapterId+"/sections/"+newRef.key), newSection)
        set(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+newRef.key), newSection)

    }
    function updateSectionTitle(newTitle){
        if(nou(chapterId) || nou(sectionId))
            return
        update(ref(database, "cape-school/courses/"+courseId+"/chapterList/"+chapterId+"/sections/"+sectionId), {title:newTitle})
        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId), {title:newTitle})
    }
    function deleteSection(){
        if(nou(chapterId) || nou(sectionId))
            return
        remove(ref(database, "cape-school/courses/"+courseId+"/chapterList/"+chapterId+"/sections/"+sectionId))
        remove(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId))
    }

    //\\// ===== ===== Element functions ===== ===== \\//\\
    function addElement(){
        
        if(chapterId == null || chapterId == undefined || sectionId == null || sectionId == undefined)        
            // Can try to look for first chapter in selected course first
            return

        var newRef = push(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements"))        
        var newElement = {
                title:"New Element",            
                type:"text",
                content:["line one", "line two", "line three", "line four",],
                description:"This is an element"
            }
                
        set(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+newRef.key), newElement).then(()=>loadElements(chapterId, sectionId))

    }
    function updateElement(_elementId, _elementData){

        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId), _elementData).then(loadElements(chapterId, sectionId))

    }
    function deleteElement(_elementId){
        if(nou(chapterId) || nou(sectionId))
            return
        remove(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId)).then(()=>loadElements(chapterId, sectionId))
        
    }
    
    //\\// ===== ===== Content functions ===== ===== \\//\\
    function addContent(_elementId, _elementContent){

        var tempContent = _elementContent
        if(!Array.isArray(_elementContent))
            tempContent = []
        
        tempContent.push("New line")
        
        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId), {content:tempContent}).then(loadElements(chapterId, sectionId))
              
    }
    function deleteContent(_elementId, _elementContent, index){
        
        var tempContent = []        
        var c = 0
        _elementContent.forEach(line=>{
            if(c++ != index){                
                tempContent.push(line)
            }
        })        
        
        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId), {content:tempContent}).then(loadElements(chapterId, sectionId))
                    
    }

    // #endregion

    //\\// ============================== ============================== Add Update & Delete (User) ============================== ============================== \\//\\    
    // #region 
        
    function enrollUser(_userId, _courseId){
        if(_userId == null)
            return
        // Put the course in their course list and also create an entry in the courseData section
        set(ref(database, "cape-school/users/"+_userId+"/courseList/"+_courseId), true)
        update(ref(database, "cape-school/users/"+_userId+"/courses/"+_courseId), {enrolled:true})
    }
    function saveStep(_step){
        set(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/step"), _step)           
    }
    function savePosition(_chapterId, _sectionId){
        set(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/position"), {chapter: _chapterId, section:_sectionId, })           
    }
    function completeSection(){
        set(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/complete"), true)           
    }
    function completeChapter(){
        set(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/chapters/"+chapterId+"/complete"), true)           
    }

    // #endregion
    



    //\\// ============================== ============================== Helper Functions ============================== ============================== \\//\\
    // #region

    function nou(variable){
        if (variable == null || variable == undefined)
            return true
        return false
    }


    // #endregion


    return (
    <div>
        {displayPage()}
    </div>
  )
}

export default Courses2