import React, { useEffect, useState } from 'react'
import "../Styles/CoarseElement.css"

function CourseElement2(props) {
  
    

    //\\// ============================== ============================== Variables & Init ============================== ============================== \\//\\    
    // #region 

    const [step, setStep] = useState(0)
    const [selected, setSelected] = useState(-1)   
    const [correctIndex, setCorrectIndex] = useState(0)    
    const [complete, setComplete] = useState(false)    

    useEffect(()=>{

        if(props.elementData.correctIndex != undefined)
            setCorrectIndex(props.elementData.correctIndex)
        
    }, [])

    // #endregion 

    //\\// ============================== ============================== Display Basic ============================== ============================== \\//\\    
    // #region 
    
    
    //\\// ===== ===== Type & Title ===== ===== \\//\\
    function displayTypeSelector(){
        if(props.editMode)
        return(
            <div>
                <select id={"typeSelect"+props.elementData.id} className='elementInput elementSelect' defaultValue={props.elementData.type} key={props.chapterId+props.sectionId+props.elementData.id}>
                    <option value={"title"}>Title</option>
                    <option value={"text"}>Text</option>
                    <option value={"question"}>Question</option>
                    <option value={"image"}>Image</option>
                    <option value={"video"}>Video</option>
                </select>
            </div>
        )
    }
    function displayTitle(){
        
        var key = "title"+props.courseId+props.sectionId+props.elementData.id
        
        if(props.editMode)
            return(
                <div key={key} className={props.elementData.type === "title" ? 'titleElement' : 'elementTitle'} >
                    <input id={'titleInput'+props.elementData.id} className='elementInput titleInput' defaultValue={props.elementData.title}></input>                    
                </div>
            )  
        else
            return(
                <div key={key} className={props.elementData.type === "title" ? 'titleElement' : 'elementTitle'}>
                    {props.elementData.title}                    
                </div>
            )
         
    }


    //\\// ===== ===== Buttons ===== ===== \\//\\
    function displayButtons(){        
        if(props.mode === "edit")
            return (
                <div>
                    {editButtons()}
                </div>
            )
        else
            return (
                <div>
                    {viewButtons()}
                </div>
            )            
    }
    function viewButtons(){        
        var buttonsArray = []
    
        if(step < props.elementData.content.length)
            buttonsArray.push(<div className='button' onClick={()=>nextStep()}>Next</div>)
                        
        return buttonsArray
    }
    function editButtons(_index){        
        var buttonsArray = []                
        buttonsArray.push(<div className='button' onClick={()=>props.deleteElement(props.elementData.id)}>Delete</div>)
        buttonsArray.push(<div className='button' onClick={()=>props.addContent(props.elementData.id, props.elementData.content)}>Add Content</div>)
        buttonsArray.push(<div className='button' onClick={()=>updateElement()}>Save</div>)        
        return buttonsArray
    }

    // #endregion 

    //\\// ============================== ============================== Display Content ============================== ============================== \\//\\    
    // #region 

    function displayContent(){        
        
        if(props.elementData.type === "text")
            return textConditional()

        if(props.elementData.type === "question")        
            return questionsConditional()
        
        if(props.elementData.type === "image")        
            return displayImage()

        if(props.elementData.type === "video")        
            return displayVideo()
        
    }    
    function textConditional(index){
        
        if(!Array.isArray(props.elementData.content)){
            return
        }        

        var key = "text"+props.courseId+props.sectionId+props.elementData.id+index
        if(props.editMode && props.elementData.content != undefined)
            return(
                props.elementData.content.map((content, index)=>(
                    <div key={"text"+index}>
                        <div className='elementText' key={key+index}>
                            <textarea key={key} className={'elementInput elementTextInput '+props.elementData.id+"Content"} defaultValue={content}></textarea>
                            <div className='closeButton' onClick={()=>props.deleteContent(props.elementData.id, props.elementData.content, index)}>Delete text line</div>                    
                        </div>
                    </div>
                ))
                
            )
        else
            return(
                props.elementData.content.map((content, index)=>(
                    <div className='elementText' key={key+index}>
                        {index <= step && content}
                    </div>
                ))
            )
        
    }    
    function questionsConditional(){

        if(!Array.isArray(props.elementData.content)){
            return
        }        

        var key = props.courseId+props.sectionId+props.elementData.id+props.randomNumberState
        if(props.editMode && props.elementData.content != undefined)
            return props.elementData.content.map((content, index)=>(                
                <div className='questionAnswer' key={"answer"+key+index}>
                    <input className={'elementInput '+props.elementData.id+"Content"} defaultValue={content}></input>
                    <div className='closeButton' onClick={()=>props.deleteContent(props.elementData.id, index)}>X</div>                                        
                    <div key={key+index+"correctInput"} onClick={()=>setCorrectIndex(index)} className={"questionRadioButon "+(correctIndex == index && " selectedRadioButton")} >Correct</div>
                </div>
            ))
        // else
        //     return props.elementData.content.map((content, index)=>(
        //         <div className={'questionAnswer ' + (index == selected && "questionSelected")+answerCheckCss(index)} onClick={()=>selectAnswer(index)} key={key+index}>                                        
        //             {content}
        //         </div>
        //     ))
    }
    function displayImage(){
        
        // if in edit mode display input field
        // either way display image from url in content[0]
        return (            
            <div>
                {props.mode === "edit" && <input className={'elementInput '+props.elementData.id+"Content"} defaultValue={props.elementData.content[0]}></input>}
                <div><img src={props.elementData.content[0]}></img></div>
            </div>            
        )
    }
    function displayVideo(){
        
        // if in edit mode display input field
        // either way display video from url in content[0]
        return (            
            <div>
                {props.mode === "edit" && <input className={'elementInput '+props.elementData.id+"Content"} defaultValue={props.elementData.content[0]}></input>}                
                <iframe width="95%" height="500px" src={props.elementData.content[0]}></iframe>
            </div>            
        )
    }

    // #endregion 

    //\\// ============================== ============================== Functions ============================== ============================== \\//\\    
    // #region 

    function nextStep(){
        return
        // Simple ones, just go to next section step
        if(props.elementData.type === "title"){
            props.setElementStep(props.chapterId, props.sectionId, props.elementData.id, 1)

            setStep(props.elementData.content.length)
            setComplete(true)
            props.nextStep()
        }
        if(props.elementData.type === "image"){
            props.setElementStep(props.chapterId, props.sectionId, props.elementData.id, 1)
            setStep(props.elementData.content.length)
            setComplete(true)
            props.nextStep()
        }
        if(props.elementData.type === "video"){
            props.setElementStep(props.chapterId, props.sectionId, props.elementData.id, 1)
            setStep(props.elementData.content.length)
            setComplete(true)
            props.nextStep()
        }
        
        // Increace element step until complete
        if(props.elementData.type === "text"){                        
            props.setElementStep(props.chapterId, props.sectionId, props.elementData.id, step+1)
            setStep(step+1)
            if(step+1>=(props.elementData.content.length)){
                setComplete(true)
                props.nextStep()
            }
        }
        props.setElementStep(props.chapterId, props.sectionId, props.elementData.id, step+1)
        // Submit question
        if(props.elementData.type === "question"){
            props.setElementStep(props.chapterId, props.sectionId, props.elementData.id, props.elementData.content.length)
            setStep(props.elementData.content.length)
            //props.setElementStep(chosenAnswer)
            
            // When this is complete css will be checked
            setComplete(true)
            props.nextStep()
            // Set complete flag to true which will show css conditionally
        }
    }

    function selectAnswer(index){
        return
        if(complete)
            return
        setSelected(index)
    }

    function answerCheckCss(index){
        return
        
        var correctIndex = props.elementData.correctIndex
        correctIndex = 1        

        if(!complete)
            return ""

        // If this index is selected and also correct
        if(index == selected && index == correctIndex)
            return " correct"
        
        // If this index is selected and not correct
        if(index == selected && index != correctIndex)
            return " notCorrect"

        // If this index is correct and not selected
        if(index == correctIndex && index != selected)
            return " correctNotSelected"

        // If none of the above conditions are true not css change takes place
        return " "
    }

    // Delete a content line
    function deleteContent(_elementId, _contentIndex){
        return
        console.log("at local function deleting content at index "+_contentIndex+" from element "+_elementId)
        props.deleteContent(props.chapterId, props.sectionId, props.elementData.id, _contentIndex)
    }

    // Save changes
    function updateElement(){


        var type = document.getElementById("typeSelect"+props.elementData.id).value                
        var title = document.getElementById("titleInput"+props.elementData.id).value
        
        var contentLines = document.getElementsByClassName(props.elementData.id+"Content")
        var contentArray = []
        var c = 0
        for(var contentLine in contentLines)
            if((c++)<contentLines.length)            
                contentArray.push(contentLines[contentLine].value)                    
        

        // if(type === "title"){
        //     console.log("of type title")
        //     contentArray = props.elementData.content
        // }

        var elementData = {
            type:type, 
            title:title,
            content:contentArray,
            correctIndex:correctIndex
        }

        props.updateElement(props.elementData.id, elementData)

    }

    // #endregion  

    return (
        <div className='elementBox' key={props.randomNumberState+props.chapterId+props.sectionId+props.elementData.id}>          
            {displayTypeSelector()}
            {displayTitle()}
            {displayContent()}            
            {displayButtons()}            
        </div>
    )
}

export default CourseElement2