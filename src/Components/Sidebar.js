import React, {useState} from 'react'
import "../Styles/Sidebar.css"

function Sidebar(props) {

    const [open, setOpen] = useState(true)
    var arrow = ">"

    function closeSidebar(event){
        event.stopPropagation()
        setOpen(false)
    }
    function openSidebar(){    
        setOpen(true)
    }

    function addElement(event){
        event.stopPropagation()        
        props.addElement(props.chapterId, props.sectionId)
    }
    function addSection(event){
        event.stopPropagation()        
        props.addSection(props.chapterId)
    }
    function addChapter(event){
        event.stopPropagation()        
        props.addChapter()
    }


    function selectChapter(_chapterId){
        
        if(_chapterId === props.chapterId)
            return
        
            props.setChapterId(_chapterId)          
    }

    function selectSection(newChapter, newSection, event){
       
        if(newChapter === props.chapterId && newSection === props.sectionId)
            return
       
        event.stopPropagation()
       
        props.setSectionId(newSection)
        props.setChapterId(newChapter)        
        
    }

    // Gets arrays of objects then maps jsx
    function displaySections(chapterData){
        return (<div>
           { sectionsArray(chapterData).map((section, index) =>(
               <div className='sectionLine' onClick={(event)=>selectSection(chapterData.id, section.id, event)} key={"sectionLine"+section.id+index}>
                    {section.title}
                    {/* <div className='closeButton'>x</div>
                    <div className='closeButton editButton'>E</div> */}
               </div>
           ))}
        </div>)
    }
    function displayChapters()
    {                           
        return (
            <div>                         
                {chaptersArray().map(chapterData=>(
                    <div className='chapterLine' onClick={()=>selectChapter(chapterData.id)} key={chapterData.id}>                                                
                        {chapterData.title}
                        {displaySections(chapterData)}
                    </div>
                ))}
            </div>
        )
    }

    // Returns an array of JSON objects
    function chaptersArray(){        
        var chaptersArray = []      
        var chaptersRef = props.coursesData.courses[props.courseId].chapters        
        for(var chapterId in chaptersRef){
            var chapterData = chaptersRef[chapterId]
            chapterData.id = chapterId
            chaptersArray.push(chapterData)
        }
        return chaptersArray
    }
    function sectionsArray(chapterData){        
        var sectionsArray = []                
        for(var sectionId in chapterData.sections){
            var sectionData = chapterData.sections[sectionId]
            sectionData.id = sectionId
            sectionsArray.push(sectionData)
        }
        return sectionsArray
    }
    
  return (
    <div className={'sidebar '+(!open ? "closed" : "")} onClick={()=>openSidebar()} key={props.randomNumber}>
        <div className='closeButton' onClick={(event)=>closeSidebar(event)}>x</div>
        <div className='sidebarTitle'>
            Chapters        
        </div>
        <div>
            <div className={props.editMode ? "":"hide"}>
                <div className='sidebarButton' onClick={(event)=>addChapter(event)}>Add Chapter</div>               
                <div className='sidebarButton' onClick={(event)=>addSection(event)}>Add Section</div>       
                <div className='sidebarButton' onClick={(event)=>addElement(event)}>Add Element</div>            
            </div>
            <div className='sidebarButton' onClick={()=>props.setPage("userCourses")}>Back to Courses</div>   
        </div>

        {displayChapters()}
        <div className='sidebarOpenButton'>{arrow}</div>
    </div>
  )
}
export default Sidebar