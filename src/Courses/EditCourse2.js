import React, { useEffect } from 'react'
import Sidebar2 from '../Components/Sidebar2.js'
import CourseElement2 from './CourseElement2.js'

function EditCourse2(props) {

  useEffect(()=>{
    console.log(props.chapterId+" "+props.sectionId)
  })

  //\\// ============================== ============================== Update Chapter & Section Titles ============================== ============================== \\//\\    
  // #region 
  function updateChapterTitle(){
    var newTitle = document.getElementById("chapterTitleInput").value
    props.updateChapterTitle(newTitle)

  }
  function updateSectionTitle(){
    var newTitle = document.getElementById("sectionTitleInput").value
    props.updateSectionTitle(newTitle)
  }
  // #endregion 

  return (
    <div className='page'>
      <Sidebar2
        chapterList={props.chapterList}
        editMode={true}
        addChapter={props.addChapter}        
        setChapterId={props.setChapterId}
        addSection={props.addSection}
        setSectionId={props.setSectionId}
        addElement={props.addElement}
        sectionId={props.sectionId}
        chapterId={props.chapterId}
        loadElements={props.loadElements}
      ></Sidebar2>
      {
        (props.chapterId != null) &&
      
        <div className={'elementBox'} key={props.chapterId+" "+props.sectionId}>
          <div key={props.chapterId+props.sectionId}>
            <div className='elementTitle'>
              Chapter Name:
            </div>
            <input id='chapterTitleInput' className='elementInput'></input>
            <div>
              <button className='button' onClick={props.deleteChapter}>Delete Chapter</button>
              <button className='button' onClick={updateChapterTitle}>Save Chapter Name</button>
            </div>
          </div>
          { 
          (props.sectionId != null) &&
          
          <div>
            <div className='elementTitle'>
              Section Name:
            </div>
            <input id='sectionTitleInput' className='elementInput'></input>
            <div>
              <button className='button' onClick={props.deleteSection}>Delete Section</button>
              <button className='button' onClick={updateSectionTitle}>Save Section Name</button>
            </div>
          </div>
          }          
        </div>
      }
      {props.elementsArray.map(element=>(
        <CourseElement2
          elementData={element}
          mode="edit"
          editMode={true}
          chapterId={props.chapterId}
          sectionId={props.sectionId}  
          deleteElement={props.deleteElement}        
          updateElement={props.updateElement}
          addContent={props.addContent}
          deleteContent={props.deleteContent}
        >
        </CourseElement2>        
      ))}

    </div>
  )
}

export default EditCourse2