import React from 'react'
import Sidebar from '../Components/Sidebar.js'
import CourseElement from './CourseElement.js'

function EditCourse(props) {
  
  // Given an element returnd the correct jsx
  function displayElement(elementData){

    return <CourseElement 
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
      mode={"edit"}
    ></CourseElement>
  }

  // Goes through elements and displays each one with a function
  function displayElements(){    

    return elementsArray().map(element=>(      
      displayElement(element)
    ))
  }

  // Returns the array of elements based on the courseId and sectionId
  function elementsArray(){

    // Check to see if chapter is already created
    if(props.chapterId == null || props.sectionId == null)
      return []
    if(
      props.coursesData.courses[props.courseId]
      == undefined
    )
      return []
    if(
      props.coursesData.courses[props.courseId].chapters[props.chapterId]
      == undefined
    )
    if(
      props.coursesData.courses[props.courseId].chapters[props.chapterId].sections[props.sectionId]
      == undefined
    )
    if(
      props.coursesData.courses[props.courseId].chapters[props.chapterId].sections[props.sectionId].elements
      == undefined
    )
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

  function updateChapterNameLocal(){
    var newChapterName = document.getElementById("chapterNameInput").value
    props.updateChapterName(props.chapterId, newChapterName)
  }
  function updateSectionNameLocal(){
    var newSectionName = document.getElementById("sectionNameInput").value
    props.updateSectionName(props.chapterId, props.sectionId, newSectionName)
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
  

  return (
    <div>
      <Sidebar
        randomNumber={props.randomNumber}
        coursesData={props.coursesData}
        courseId={props.courseId}
        sectionId={props.sectionId}
        chapterId={props.chapterId}
        setChapterId={props.setChapterId}
        setSectionId={props.setSectionId}
        editMode={true}
        addChapter={props.addChapter}
        addSection={props.addSection}
        addElement={props.addElement}
        deleteChapter={props.deleteChapter} 
        deleteSection={props.deleteSection} 
        deleteElement={props.deleteElement}
        setPage={props.setPage}
        mode={"edit"}
      ></Sidebar>
      {
        (props.chapterId != null && props.sectionId != null) &&
      
        <div className='elementBox' key={props.randomNumberState+props.chapterId+props.sectionId}>
          <div key={props.chapterId+props.sectionId}>
            <div className='elementTitle'>
              Chapter Name:
            </div>
            <input id='chapterNameInput' className='elementInput' defaultValue={getChapterTitle()}></input>
            <div>
              <button className='button' onClick={()=>props.deleteChapter(props.chapterId)}>Delete Chapter</button>
              <button className='button' onClick={()=>updateChapterNameLocal()}>Save Chapter Name</button>
            </div>
          </div>
          <div>
            <div className='elementTitle'>
              Section Name:
            </div>
            <input id='sectionNameInput' className='elementInput' defaultValue={getSectionTitle()}></input>
            <div>
              <button className='button' onClick={()=>props.deleteSection(props.chapterId, props.sectionId)}>Delete Section</button>
              <button className='button' onClick={()=>updateSectionNameLocal()}>Save Section Name</button>
            </div>
          </div>

        </div>
      }
      {displayElements()}
    </div>
  )
}

export default EditCourse