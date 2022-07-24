import React, {useEffect, useState} from 'react'
import "../Styles/Sidebar.css"

function Sidebar(props) {

    const [open, setOpen] = useState(true)
    var arrow = ">"

    //\\// ============================== ============================== Display ============================== ============================== \\//\\    
    // #region 
    function closeSidebar(event){
        event.stopPropagation()
        setOpen(false)
    }
    function openSidebar(){    
        setOpen(true)
    }
    // #endregion 

    //\\// ============================== ============================== Add ============================== ============================== \\//\\    
    // #region 
    function addChapter(event){
        event.stopPropagation()        
        props.addChapter()
    }
    function addSection(event){
        event.stopPropagation()        
        props.addSection()
    }
    function addElement(event){
        event.stopPropagation()        
        props.addElement()
    }
    // #endregion 

    //\\// ============================== ============================== Helper ============================== ============================== \\//\\    
    // #region 
    function sectionClick(_chapterId, _sectionId){
        props.setStep(0)
        props.setSection(_chapterId, _sectionId)
        props.loadElements(_chapterId, _sectionId)
        props.loadUserData(_chapterId, _sectionId)
        props.loadStep(_chapterId, _sectionId)
        props.savePosition(_chapterId, _sectionId)
    }
    // #endregion 

  return (
    <div className={'sidebar '+(!open ? "closed" : "")} onClick={()=>openSidebar()} key={props.randomNumber}>
        <div className='sidebarOpenButton'>{arrow}</div>
        <div className='closeButton' onClick={(event)=>closeSidebar(event)}>x</div>
        <div className='sidebarTitle'>
            Chapters        
        </div>

        <div>            
            {                
                props.editMode &&                 
                <div>
                    <div className='sidebarButton' onClick={(event)=>addChapter(event)}>Add Chapter</div>               
                    <div className='sidebarButton' onClick={(event)=>addSection(event)}>Add Section</div>       
                    <div className='sidebarButton' onClick={(event)=>addElement(event)}>Add Element</div>            
                </div>
            }

            <div className='sidebarButton' onClick={()=>props.setPage("userCourses")}>Back to Courses</div>   
        </div>

        {props.chapterList.map((chapter, index)=>(
            <div className="chapterLine" key={"chapter"+chapter.id+index}>
            {/* <div onClick={()=>props.setChapterId(chapter.id)} className="chapterLine" key={"chapter"+chapter.id+index}> */}
                <div className={((props.chapterId == chapter.id) && " chapterLineSelected")}>
                    {chapter.title}
                </div>
                <div className={'sectionLineContainer '+(chapter.id == props.chapterId ? ' display':"")}>
                    {chapter.sections.map((section, sectionIndex)=>(
                        <div onClick={()=>sectionClick(chapter.id, section.id)} className="sectionLine" key={"chapter"+chapter.id+"section"+section.id+sectionIndex} >
                            <div className={(((props.sectionId == section.id) && (props.chapterId == chapter.id)) ? " sectionLineSelected":"")}>
                                {section.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}
export default Sidebar

Sidebar.defaultProps={
    setStep:()=>{},
    loadUserData:()=>{},
    loadStep:()=>{console.log("no load step function")}, 
    savePosition:()=>{}
}