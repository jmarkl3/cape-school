import React, { useEffect, useState } from 'react'
import CourseElement from './CourseElement.js'
import Sidebar2 from "../Components/Sidebar2.js"
import CourseElement2 from './CourseElement2.js'

function ViewCourse2(props) {
  
    const [step, setStep] = useState(0)

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
                  >
                  </CourseElement2>        
                }
              </div>
            ))                  
        )
    }



  return (
    <div className='page'>        
        <Sidebar2
            sectionId={props.sectionId}
            chapterId={props.chapterId}            
            chapterList={props.chapterList}
            loadElements={props.loadElements}
            setPage={props.setPage}            
            setChapterId={props.setChapterId}
            setSection={props.setSection}          
            setStep={setStep}                    
            loadUserData={props.loadUserData}  
            loadStep={props.loadStep}                                     
            savePosition={props.savePosition}
        ></Sidebar2>   
      {displayElements()}        
    </div>
  )
}

export default ViewCourse2