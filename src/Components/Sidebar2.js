import React, {useEffect, useState} from 'react'
import "../Styles/Sidebar.css"
import logoImage from "../Images/capeschool-logo.png"

function Sidebar(props) {

    const [open, setOpen] = useState(true)
    var arrow = "<"

    useEffect(()=>{
        setTimeout(()=>setOpen(false), 400)
    },[])

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
        //console.log("selecting chapter " +_chapterId+" section "+_sectionId)
        props.setStep(0)
        props.setSection(_chapterId, _sectionId)
        props.loadStep(props.courseId, _chapterId, _sectionId)
        props.savePosition(_chapterId, _sectionId)
        props.loadElements(props.courseId, _chapterId, _sectionId)        
    }
    // #endregion 

  return (
    <div className={'sidebar posF '+(!open ? "closed" : "")} onClick={()=>openSidebar()} key={props.randomNumber}>
        <div className='sidebarLogo'><img src={logoImage}></img></div>
        <div className=''>
            {!open&& <div className='sidebarOpenButton'>{arrow}</div>}

            {open&&<div className='closeButton' onClick={(event)=>closeSidebar(event)}>x</div>}


            {open&&<div className='buttonBox'>            
                {                
                    props.editMode &&                 
                    <div>
                        <div className='sidebarButton' onClick={(event)=>addChapter(event)}>Add Chapter</div>               
                        <div className='sidebarButton' onClick={(event)=>addSection(event)}>Add Section</div>       
                        <div className='sidebarButton' onClick={(event)=>addElement(event)}>Add Element</div>            
                    </div>
                }

                <div className='sidebarButton' onClick={()=>props.setPage("userCourses")}>Back to Courses</div>   
            </div>}

            {open && <div className='sidebarTitle'>
                Chapters        
            </div>}
            {open&& props.chapterList.map((chapter, index)=>(
                <div className="chapterLine" key={"chapter"+chapter.id+index}>
                    {!props.editMode && props.isChapterComplete(chapter.id) && <div className='checkbox'></div>}
                {/* <div onClick={()=>props.setChapterId(chapter.id)} className="chapterLine" key={"chapter"+chapter.id+index}> */}
                    <div className={" "+((props.chapterId == chapter.id) && " chapterLineSelected")}>
                        {chapter.title}
                    </div>
                    <div className={'sectionLineContainer '+(chapter.id == props.chapterId ? ' display':"")}>
                        {chapter.sections.map((section, sectionIndex)=>(
                            <div onClick={()=>sectionClick(chapter.id, section.id)} className="sectionLine" key={"chapter"+chapter.id+"section"+section.id+sectionIndex} >
                                {!props.editMode && props.isSectionComplete(chapter.id, section.id) && <div className='checkbox'></div>}
                                <div className={(((props.sectionId == section.id) && (props.chapterId == chapter.id)) ? " sectionLineSelected":"")}>
                                    {section.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
export default Sidebar

Sidebar.defaultProps={
    setStep:()=>{console.log("no set step function ===============================================")},
    loadUserData:()=>{},
    loadStep:()=>{console.log("no load step function")}, 
    savePosition:()=>{},
    isChapterComplete:()=>{return false},
    isSectionComplete:()=>{return false},
    getAnswerChoice:()=>{}
}