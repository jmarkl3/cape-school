import React, { useEffect, useState } from 'react'
import CourseElement from './CourseElement.js'
import Sidebar from "../Components/Sidebar.js"
import { checkActionCode } from 'firebase/auth'

function ViewCourse(props) {
  
  const [step, setStep] = useState(0)
  const [chapterId, setChapterId] = useState(null)
  


  // Goes through elements and displays each one with a function
  function displayElements(){    

    return elementsArray().map((element, index)=>(                    
      displayElement(element, index)
    ))

  }
  // Returns the array of elements based on the courseId and sectionId
  function elementsArray(){

    // If there is no course data return
    if(props.courseData == null)
      return []

    // If there are no specified chapter or section go to the first one
    var chapter = props.chapter
    if(chapter == null)
      chapter = getFirstChapter()
    if(chapter == null)
      return []
    var section = props.section
    if(section == null)
      section = getFirstSection(chapter)
    if(section == null)
      return []
    

    var elementsObject = props.courseData.chapters[chapter].sections[section].elements
    var elementsArray = []

    for(var elementId in elementsObject){
      var element = elementsObject[elementId]
      element.id = elementId
      elementsArray.push(element)
    }

    return elementsArray
  }
  // Given an element returnd the correct jsx
  function displayElement(elementData, _index){
    if(_index <= step)
      return <CourseElement 
        key={"element"+props.chapterId+props.sectionId+ _index}
        elementData={elementData} 
        sectionId={props.sectionId} 
        courseId={props.courseId} 
        chapterId={props.chapterId} 
        deleteChapter={props.deleteChapter} 
        deleteSection={props.deleteSection} 
        deleteElement={props.deleteElement} 
        randomNumberState={props.randomNumberState}
        updateElement={props.updateElement}
        deleteContent={props.deleteContent}
        addContent={props.addContent}
        mode={"view"}
        nextStep={nextStep}
        setElementStep={props.setElementStep}
        getElementStep={props.getElementStep}
      ></CourseElement>

  }

  // Helper functions
  function getFirstChapter(){    

    for(var id in props.courseData.chapters){
      return id
    }

    return null
  }  
  function getFirstSection(_chapterId){    
    for(var id in props.courseData.chapters[_chapterId].sections){
      return id
    }

    return null
  }
  function setSectionIdLocal(_sectionId){
    if(_sectionId === props.sectionId)
      return
    setStep(0) 
    props.setSectionId(_sectionId)
  }
  function setChapterIdLocal(_courseId, _sectionId){
    if(_courseId === props.courseId)
      return
    setStep(0) 
    props.setChapterId(_courseId, _sectionId)
  }

  // Course progression function
  function nextStep(){
    // Puts the step value in the user data object
    props.setSectionStep(props.chapterId, props.sectionId, step+1)
    
    // Sets the local step state variable
    setStep(step+1)
    
  }




  return (
    <div>
      <Sidebar
        randomNumber={props.randomNumber}
        coursesData={props.coursesData}
        courseId={props.courseId}
        sectionId={props.sectionId}
        chapterId={props.chapterId}
        setChapterId={setChapterIdLocal}
        setSectionId={setSectionIdLocal}
        editMode={false}
        addChapter={props.addChapter}
        addSection={props.addSection}
        addElement={props.addElement}
        deleteChapter={props.deleteChapter} 
        deleteSection={props.deleteSection} 
        deleteElement={props.deleteElement}
        setPage={props.setPage}   
        courseData={props.courseData}     
      ></Sidebar>      
      {displayElements()}
    </div>
  )
}

export default ViewCourse