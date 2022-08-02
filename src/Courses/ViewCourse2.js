import React, { useEffect, useState } from 'react'
import CourseElement from './CourseElement.js'
import Sidebar2 from "../Components/Sidebar2.js"
import CourseElement2 from './CourseElement2.js'

function ViewCourse2(props) {
  
    useEffect(()=>{
      // Call function that loads starting chapter, section, and step. It will update locally and in db while user goes through course but only loads from db once
    })

    function stepUp(){
      props.saveStep(props.viewStep+1)
    }

    function displayElements(){        
        return (
            props.elementsArray.map((element, index)=>(
              <div key={props.chapterId+props.sectionId+element.id}>
                {
                  props.viewStep >= index &&
                  <CourseElement2
                    elementData={element}
                    editMode={false}
                    chapterId={props.chapterId}
                    sectionId={props.sectionId}  
                    deleteElement={props.deleteElement}        
                    updateElement={props.updateElement}
                    addContent={props.addContent}
                    deleteContent={props.deleteContent}
                    stepUp={stepUp}   
                    complete={props.viewStep>index}
                    saveAnswerSelection={props.saveAnswerSelection}
                    courseId={props.courseId}
                    getAnswerChoice={props.getAnswerChoice}
                  >
                  </CourseElement2>        
                }
              </div>
            ))                
        )
    }
 
  function completeSection(){
    console.log("completing section "+props.sectionId)
    props.completeSection()
    //setStep(0)
  }

  function completeButton(){
    console.log("in complete button")
    if(props.viewStep > props.elementsArray.length-1)
      if(!props.isSectionComplete(props.chapterId, props.sectionId))
        return <div className='button' onClick={()=>completeSection()}>Complete Section</div>
      else
        return(
          <div>
            <div className='sectionCompleteMessage'>Section Complete</div>
            <div className='button' onClick={()=>completeSection()}>Next Section</div>
          </div>
        )
  }

  return (
    <div className='page'>        
        {props.isSectionComplete(props.chapterId, props.sectionId) && <div className='sectionCompleteMessage'>Section Complete</div>}
        <Sidebar2
            sectionId={props.sectionId}
            chapterId={props.chapterId}            
            chapterList={props.chapterList}
            loadElements={props.loadElements}
            setPage={props.setPage}            
            setChapterId={props.setChapterId}
            setSection={props.setSection}          
            loadUserData={props.loadUserData}  
            loadStep={props.loadStep}                                     
            savePosition={props.savePosition}
            courseId={props.courseId}
            isSectionComplete={props.isSectionComplete}
            isChapterComplete={props.isChapterComplete}
        ></Sidebar2>   
      {displayElements()}  
      {completeButton()} 
    </div>
  )
}

export default ViewCourse2