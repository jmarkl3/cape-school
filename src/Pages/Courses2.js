import React, { useEffect, useState } from 'react'
import BrowseCourses2 from '../Courses/BrowseCourses2'
import {getDatabase, set, push, onValue, ref, update, remove, refFromURL} from "firebase/database"
import Enroll from '../Courses/Enroll2'
import { checkActionCode } from 'firebase/auth'
import UserCourses2 from '../Courses/UserCourses2'
import EditCourse2 from '../Courses/EditCourse2'
import ViewCourse2 from '../Courses/ViewCourse2'
import { getNextKeyDef } from '@testing-library/user-event/dist/keyboard/getNextKeyDef'

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

      

        account load data
        account save data

        questions
        question answers can be selected
        question answer submitted when submit button is pressed
        question css changes based on correct or not  
        
        userData is loaded from the db

        position is saved into db
        position is loaded from the db        
        position data shows on side menu
        position data shows on element display
        when position loads step also loads
        
        save selected question answers into db
        load question answer (loads into userData, when elemnt loads gets if from there)
                
        submit question button displays for question elements
        saves answer choice when pressed
        sets complete to true
        displays css (displays when complete == true)
        goes to next element
        if question is incorrect retry button shows
        retry button functionality

        
        continue button functionality
        completes the element (set complete to true)
        step up the viewCourses2 component
        if vewCourses2 is above length show complete course button
        when the complete section button is pressed set complete flag in userData 

        checkbox shows next to complete sections
        checkbox shows next to complete chapters

        display question answers from db
            on each question load, if complete look in userData for the selected answer by calling props.getSelectedAnswer(_courseId, _chapterId, _sectionId, _elementId)

            when the complete section button is pressed go to next section (and set proper variables)
              nextSection button finds next section, or next chapter

        start from first chapter and first section if there is no position saved
        open sidebar on load, then close it right away
        when all elements are coplete complete section button shows, when section is complete show Message:  Section Complete  Button: Next Section        
        
        delete image in account page
        
        *


        new ui
          common things pulled into same css file
          vars css file has color variables
          list classes that can be in a combined css file          

        
        get rid of 2 at end of files and unnecessary files        
        

        finishing touches
          quotes
          links in footer
          password reset setup
          no need for selection menu at start, just a message and a button

        payment screen
          card input/other methods shows when user clicks pay now
          button somewhere to updgrade (maybe at third chapter)
        
        enroll button takes existing user to the course
        
        send contact message functionality
          maybe just save it in the db, maybe send it to an email, maybe firebase can send emails
        
        make a name
        logo
        create a website
        create an email
          update contact info on the site
        get a phone number for it
        put on the map

        Content:
        info about real estate agent pay, job growth, type of person that would want to do it
        info page about how to get licence (all the steps and exactly how to do them)
*/
    /*
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
    const [userData, setUserData] = useState(null)

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
                    courseId={courseId}

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
                    userData={userData}
                    courseId={courseId}
                    saveAnswerSelection={saveAnswerSelection}
                    getAnswerChoice={getAnswerChoice}
                    completeSection={completeSection}
                    isSectionComplete={isSectionComplete}
                    isChapterComplete={isChapterComplete}
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
        loadUserData(_courseId)
        setPage(page)
        //loadStep(_courseId)
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
    function loadElements(_courseId, _chapterId, _sectionId){
        
        var tempElementsArray = []

        //console.log("loading elements for course "+_courseId+" chapter "+_chapterId+" section "+_sectionId)

        if(nou(chapterId) || nou(sectionId))
            setElementsArray(tempElementsArray)

        onValue(ref(database, "cape-school/courses/"+_courseId+"/chapters/"+_chapterId+"/sections/"+_sectionId+"/elements"), snap=>{
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

    // maybe can load json object with each chapter with completion status, each section with completion status or step, and each element with selection values
    // Then this json can be used for displaying view course progress, for sidebar completion indicators, and on a stats page
    function loadUserData(_courseId,){
        onValue(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId), snap=>{                        
            //console.log("loading user data for the course "+_courseId)
            //console.log(snap.val())
            setUserData(snap.val())
            // returns a json with all the chapters and sections that the user has touched upon, telling their completion status, step, element data, and current position (chapter and section)
        })
    }

    function loadStep(_courseId, _chapterId, _sectionId){
        // Set it to 0 initially for when switching sections because of flashing ahead
        setViewStep(0)
        onValue(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId+"/chapters/"+_chapterId+"/sections/"+_sectionId+"/step"), snap=>{                      
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

    // Last position the user was at, or furthest along they are
    function loadPosition(_courseId){
        onValue(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId+"/position"), snap=>{
            // If there is  a first section and chapter load them
            if(snap.val() != undefined){
                setChapterPosition(snap.val().chapter)
                setSectionPosition(snap.val().section)
                setChapterId(snap.val().chapter)
                setSectionId(snap.val().section)
                loadElements(_courseId, snap.val().chapter, snap.val().section)
                loadStep(_courseId, snap.val().chapter, snap.val().section)
                // Maybe have a check to see if they exist in the chapters and sections in the course, if not go to first ones
            }
            else{
                // Get first chapter and section
                var firstChapter = getFirstChapter(_courseId)
                var firstSection = getFirstSection(_courseId, firstChapter)
                setChapterId(firstChapter.id)
                setSectionId(firstSection.id)
            }
        })
        setSectionPosition()
    }


    // Get users selection for element (return null if not there)
    function getAnswerChoice(_chapterId, _sectionId, _elementId){
        
        // Make sure the parameters and path are there
        if(_sectionId == null || _elementId == null || userData == null)
            return -1
        if(!validUserDataPath(_chapterId, _sectionId, _elementId))
            return -1                

        // Return the selection that is saved in user data
        return userData.chapters[_chapterId].sections[_sectionId].elements[_elementId].selection
    }

    function isSectionComplete(_chapterId, _sectionId){
        
        if(!validUserDataPath(_chapterId, _sectionId))
            return false
            
        return userData.chapters[_chapterId].sections[_sectionId].complete
    }
    function isChapterComplete(_chapterId){

        var returnValue = true

        // If theres no data for this chapter return false
        if(!validUserDataPath(_chapterId))            
            returnValue = false  
            
        // Find the corresponding chapter
        chapterList.forEach(chapter=>{
            // For the corresponding chapter
            if(chapter.id == _chapterId){
                // check each section to see if its complete
                chapter.sections.forEach(section=>{
                    if(!isSectionComplete(chapter.id, section.id))                        
                        returnValue = false
                    
                })}
        })

        return returnValue
    }



    // function loadPosition(){
    //     if(userData == null || userData.position == null)
    //         return null
    //         // returns {chapter: __ , section: __ }
    //     return userData.position 
    // }


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
                
        set(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+newRef.key), newElement).then(()=>loadElements(courseId, chapterId, sectionId))

    }
    function updateElement(_elementId, _elementData){

        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId), _elementData).then(loadElements(courseId, chapterId, sectionId))

    }
    function deleteElement(_elementId){
        if(nou(chapterId) || nou(sectionId))
            return
        remove(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId)).then(()=>loadElements(courseId, chapterId, sectionId))
        
    }
    
    //\\// ===== ===== Content functions ===== ===== \\//\\
    function addContent(_elementId, _elementContent){

        var tempContent = _elementContent
        if(!Array.isArray(_elementContent))
            tempContent = []
        
        tempContent.push("New line")
        
        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId), {content:tempContent}).then(loadElements(courseId, chapterId, sectionId))
              
    }
    function deleteContent(_elementId, _elementContent, index){
        
        var tempContent = []        
        var c = 0
        _elementContent.forEach(line=>{
            if(c++ != index){                
                tempContent.push(line)
            }
        })        
        
        update(ref(database, "cape-school/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId), {content:tempContent}).then(loadElements(courseId, chapterId, sectionId))
                    
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
        //console.log("saving position "+_chapterId+" "+_sectionId)
        set(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/position"), {chapter: _chapterId, section:_sectionId, })           
    }
    function saveAnswerSelection(_courseId, _chapterId, _sectionId, _elementId, _selection, _correct){
        // set(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId+"/selection"), _selection)
        // set(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId+"/correct"), _correct)

        //console.log("updating anser selection "+_sectionId+" "+_correct)

        update(ref(database, "cape-school/users/"+props.userId+"/courses/"+_courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/elements/"+_elementId), {selection:_selection, correct:_correct})

    }
    function completeSection(){
        set(ref(database, "cape-school/users/"+props.userId+"/courses/"+courseId+"/chapters/"+chapterId+"/sections/"+sectionId+"/complete"), true)
        
        nextSection()

        // if its the last section in the chapter set the chapter to complete

        // find the next chapter in the section, or the first section in the next chapter, or complete the course
        // set sectionId and chapterId accordingly
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
    function validUserDataPath(_chapterId, _sectionId, _elementId){
        
        if(userData == null)
            return false

        if(_chapterId)
            if(userData.chapters == null || userData.chapters[_chapterId] == null)
                return false
        if(_sectionId)
            if(userData.chapters[_chapterId].sections == null  || userData.chapters[_chapterId].sections[_sectionId] == null)
                return false
        if(_elementId)                    
            if(userData.chapters[_chapterId].sections[_sectionId].elements == null  || userData.chapters[_chapterId].sections[_sectionId].elements[_elementId] == null)
                return false
        return true     
    }
    function nextSection(){
        var atSection = false
        var nextSection = null
        // Look at each chapter in the array for the current chapter
        chapterList.forEach(chapter =>{
            if(chapter.id == chapterId)
                // Look through the sections in that chapter
                chapter.sections.forEach(section=>{
                    // And on the next go around get that section Id
                    if(atSection){
                        nextSection = section
                        atSection = false
                    }
                    // If the section matches set a flat
                    if(section.id == sectionId) 
                        atSection = true
                })
        })
        
        //console.log("next section is "+nextSection.title)
        //console.log("with id "+nextSection.id)

        if(nextSection != null){
            setSectionId(nextSection.id)
            setViewStep(0)
            loadStep(courseId, chapterId, nextSection.id)
            loadElements(courseId, chapterId, nextSection.id)   
        }
        else{
            // Go to next chapter
            nextChapter()
        }

        // If the current section was the last one it will never get this value so it will still be null, meaning there is no next section in this chapter
        return nextSection
    }
    function nextChapter(){
        var atChapter = false
        var nextChapter = null
        // Look at each chapter in the array for the current chapter
        chapterList.forEach(chapter =>{
            if(atChapter){
                nextChapter = chapter
                atChapter = false
            }
            if(chapter.id == chapterId)
                atChapter = true               
        })
        
        //console.log("next section is "+nextSection.title)
        //console.log("with id "+nextSection.id)

        if(nextChapter != null){
            setChapterId(nextChapter.id)
            var firstSection = null
            firstSection = getFirstSection(courseId, nextChapter.id)
            setSectionId(firstSection.id)
            setViewStep(0)
            loadStep(courseId, nextChapter.id, firstSection.id)
            loadElements(courseId, nextChapter.id, firstSection.id)   
        }
        else{
            // Complete course (call a function that makes sure all other chapters and sectoin have been completed)

            console.log("at end of course")
        }

        // If the current section was the last one it will never get this value so it will still be null, meaning there is no next section in this chapter
        return nextSection
    }
    // returns the first section in the chapter
    function getFirstSection(_courseId, _chapterId){
        var firstSection = null
        var first = true
        chapterList.forEach(chapter =>{
            if(chapter.id == _chapterId){
                chapter.sections.forEach(section=>{
                    if(first){
                        firstSection = section
                        first = false                
                        return firstSection
                    }
                })                
            }         
        })
        return firstSection
    }
    // Returns the first chapter in a course
    function getFirstChapter(_courseId){
        var firstChapter = null
        var first = true
        chapterList.forEach(chapter =>{
            if(first){
                firstChapter = chapter
                first = false
                return firstChapter
            }         
        })
        return firstChapter
    }


    function goToSection(){
        //setViewStep(0)
        //setSection(chapterId, sectionId)
        //loadStep(props.courseId, _chapterId, _sectionId)
        // savePosition(_chapterId, _sectionId)
        // loadElements(props.courseId, _chapterId, _sectionId)   
    }

    // #endregion

    return (
    <div>
        {displayPage()}
    </div>
  )
}

export default Courses2 