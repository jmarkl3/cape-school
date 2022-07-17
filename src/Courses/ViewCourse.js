import React, { useEffect, useState } from 'react'
import CourseElement from './CourseElement.js'
import Sidebar from "../Components/Sidebar.js"

function ViewCourse(props) {
  
  const [step, setStep] = useState(0)

  useEffect(()=>{
    //setStep(props.getSectionStep(props.chapterId, props.sectionId))
    setStep(0)
  },[props.sectionId, props.chapterId])

  // Goes through elements and displays each one with a function
  function displayElements(){    

    return elementsArray().map((element, index)=>(          
        displayElement(element, index)
    ))

  }
  // Returns the array of elements based on the courseId and sectionId
  function elementsArray(){

    if(!props.pathExists(props.chapterId, props.sectionId))
      return []

    var elementsObject = props.coursesData.courses[props.courseId].chapters[props.chapterId].sections[props.sectionId].elements
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

  function nextStep(){
    // Puts the step value in the user data object
    props.setSectionStep(props.chapterId, props.sectionId, step+1)
    
    // Sets the local step state variable
    setStep(step+1)
    
    // retireve that on section start (so acll from useEffect when sectionId or couarseId cahnge)

  }


  
  function getChapterTitle(){
    if(props.pathExists(props.chapterId))
      return props.coursesData.courses[props.courseId].chapters[props.chapterId].title
    else
      return "title not found"
  }

  function getSectionTitle(){
    if(props.pathExists(props.chapterId, props.sectionId))
      return props.coursesData.courses[props.courseId].chapters[props.chapterId].sections[props.sectionId].title
    else
      return "title not found"
    //props.coursesData.courses[props.courseId].chapters[props.chapterId].title
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
      ></Sidebar>      
      {displayElements()}
    </div>
  )
}

export default ViewCourse