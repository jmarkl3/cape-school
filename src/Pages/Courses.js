import React, { useEffect, useState } from 'react'
import "../Styles/Courses.css"
import BrowseCourses from "../Courses/BrowseCourses.js"
import Enroll from "../Courses/Enroll.js"
import UserCourses from "../Courses/UserCourses.js"
import ViewCourse from "../Courses/ViewCourse.js"
import EditCourse from "../Courses/EditCourse.js"

function Courses() {

    // State Variables
    const [page, setPage] = useState("userCourses")
    const [courseId, setCourseId] = useState("course1")
    const [chapterId, setChapterId] = useState("chapter1")
    const [sectionId, setSectionId] = useState("section1")
    const [randomNumberState, setRandomNumberState] = useState(10)


    // Data state
    const [coursesData, setCoursesData] = useState(
        {
            courses:{
                course1:{
                    name:"this is the first course",
                    imageUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=",
                    description:"this is the description of the first course",
                    chapters:{
                        chapter1:{
                            title:"this is the first chapter a",
                            sections:{
                                section1:{
                                    title:"this is the first section a",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element from the first chapter and first section",
                                            content:[
                                                "part one of the first element in the first chapter",
                                                "part one of the first element a",
                                                "part one of the first element a",
                                                "part one of the first element a",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element in the first chapter",
                                            content:[
                                                "part one of the first element in the first chapter in the first section in the second element",                                            
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element answer",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                },
                                section2:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                }
                            }
                        },
                        chapter2:{
                            title:"this is the second chapter",
                            sections:{
                                section1:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                },
                                section2:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                }
                            }
                        },
                        chapter3:{
                            title:"this is the first chapter",
                            sections:{
                                section1:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                },
                                section2:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                }
                            }
                        },
                        chapter4:{
                            title:"this is the second chapter",
                            sections:{
                                section1:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                },
                                section2:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"title",
                                            title:"this is a title element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element2:{
                                            type:"text",
                                            title:"this is a text element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element3:{
                                            type:"question",
                                            title:"this is a question element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element4:{                                    
                                            type:"image",
                                            title:"this is an image element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                        element5:{                                    
                                            type:"video",
                                            title:"this is a video element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        },
                                    }
                                }
                            }
                        },
                    }
                },
                course2:{
                    name:"this is the second course",
                    imageUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=",
                    description:"this is the description of the first course",
                    chapters:{
                        chapter1:{
                            title:"this is the first chapter",
                            sections:{
                                section1:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"text",
                                            title:"this is the first element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                course3:{
                    name:"this is the third course",
                    imageUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=",
                    description:"this is the description of the first course",
                    chapters:{
                        chapter1:{
                            title:"this is the first chapter",
                            sections:{
                                section1:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"text",
                                            title:"this is the first element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                course4:{
                    name:"this is the fourth course",
                    imageUrl:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fsnowcapped-trees-glistening-sunshine-winter-landscape-thick-snow-covering-forest-trail-stretching-ahead-70363761.jpg&f=1&nofb=",
                    description:"this is the description of the first course",
                    chapters:{
                        chapter1:{
                            title:"this is the first chapter",
                            sections:{
                                section1:{
                                    title:"this is the first section",
                                    elements:{
                                        element1:{
                                            type:"text",
                                            title:"this is the first element",
                                            content:[
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                                "part one of the first element",
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        }
    )    
    
    const [userData, setUserData] = useState({
        name:"user name",
        phone:"phone number",
        courses:{
            course1:{
                chapters:{
                    chapter1:{
                        sections:{
                            section1:{
                                complte:false,
                                step:4,
                                elements:{
                                    element1:{
                                        complete:true,
                                        index:2
                                    }
                                }
                            }
                        }
                    }
                }
            },
            course2:{
                chapters:{
                    chapter1:{
                        sections:{
                            section1:{
                                elements:{
                                    element1:"complete",
                                    element2:2,
                                }
                            }
                        }
                    }
                }
            },
        }
    })
    
    // On Start
    useEffect(()=>{
              
    },[])

    // Display functions
    function displayPage(){        
        if(page === "browseCourses")
            return <BrowseCourses coursesData={coursesData} setPage={setPage} goToCourse={goToCourse} ></BrowseCourses>
        if(page === "userCourses")
            return <UserCourses   coursesData={coursesData} setPage={setPage} goToCourse={goToCourse} userData={userData}></UserCourses>
        if(page === "enroll")
            return <Enroll coursesData={coursesData} goToCourse={goToCourse} courseId={courseId} setPage={setPage}></Enroll>
        if(page === "viewCourse")
            return <ViewCourse 
                coursesData={coursesData} 
                courseId={courseId} 
                chapterId={chapterId} 
                sectionId={sectionId} 
                setPage={setPage} 
                setChapterId={setChapterId} 
                setSectionId={setSectionId} 
                addChapter={addChapter} 
                addSection={addSection} 
                addElement={addElement} 
                randomNumberState={randomNumberState} 
                deleteChapter={deleteChapter} 
                deleteSection={deleteSection} 
                deleteElement={deleteElement}
                updateChapterName={updateChapterName}
                updateSectionName={updateSectionName}
                pathExists={pathExists}
                updateElement={updateElement}
                deleteContent={deleteContent}
                addContent={addContent}
                setSectionStep={setSectionStep}
                getSectionStep={getSectionStep}
                setElementStep={setElementStep}
                getElementStep={getElementStep}
            ></ViewCourse>
        if(page === "editCourse")
            return <EditCourse 
                coursesData={coursesData} 
                courseId={courseId} 
                chapterId={chapterId} 
                sectionId={sectionId} 
                setPage={setPage} 
                setChapterId={setChapterId} 
                setSectionId={setSectionId} 
                addChapter={addChapter} 
                addSection={addSection} 
                addElement={addElement} 
                randomNumberState={randomNumberState} 
                deleteChapter={deleteChapter} 
                deleteSection={deleteSection} 
                deleteElement={deleteElement}
                updateChapterName={updateChapterName}
                updateSectionName={updateSectionName}
                pathExists={pathExists}
                updateElement={updateElement}
                deleteContent={deleteContent}
                addContent={addContent}                
            ></EditCourse>
    }
    // Nav functions
    function goToCourse(_courseId, _page){        
        
        // Set Course
        setCourseId(_courseId)              
        
        
        // Find first chapter                
        var topChapter = null
        var c = 0
        for(var chapterIdTemp in coursesData.courses[courseId].chapters)
            if(c++ == 0)
                topChapter = chapterIdTemp

        // Find first section
        var topSection = null
        var c = 0
        for(var sectionIdTemp in coursesData.courses[courseId].chapters[topChapter].sections)
            if(c++ == 0)
                topSection = sectionIdTemp
        
        // Set the chapter and section to the top one
        setChapterId(topChapter)
        setSectionId(topSection)

        // Go to the specified page
        setPage(_page)
    }    
var a = "a"
    
    // Add functions
    function addCourse(){
        var newCourseId = "course"+Math.random(0,10000)
        courseId.courses[newCourseId] = {
            name:"New Course",
            chapters:{
                chapter1:{
                    name:"New chapter",
                    sections:{
                        section1:{
                            name:"new section",
                            elements:{
                                element1:{
                                    title:"First Element",
                                    content:["add content here"]
                                }
                            }
                        }

                    }

                }
            }
        }
    }
    function addChapter(){
        // Create a chapter name
        var newChapterId = "chapter"+randomNumber()
        ensurePath(newChapterId)        
        setRandomNumberState(randomNumber())
    }
    function addSection(_chapterId){
        
        // Create a new id
        var newSectionId = "section"+randomNumber()
        
        ensurePath(_chapterId, newSectionId)

        setRandomNumberState(randomNumber())
    }
    function addElement(_chapterId, _sectionId){        
        
        // Create a new id
        var newElementId = "element"+randomNumber()

        ensurePath(_chapterId, _sectionId, newElementId)

        setRandomNumberState(randomNumber())
    }
    function addContent(_chapterId, _sectionId, _elementId){        
        if(pathExists(_chapterId, _sectionId, _elementId)){
            coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].content.push("new content")
            updateDom()
        }
    }

    // Update functinos
    function updateChapterName(_chapterId, newName){
        if(pathExists(_chapterId)){
            var tempCoursesData = coursesData
            tempCoursesData.courses[courseId].chapters[chapterId].title = newName
            setCoursesData(tempCoursesData)
            updateDom()
        }
    }
    function updateSectionName(_chapterId, _sectionId, newName){        
        if(pathExists(_chapterId, _sectionId)){
            var tempCoursesData = coursesData
            tempCoursesData.courses[courseId].chapters[chapterId].sections[_sectionId].title = newName
            setCoursesData(tempCoursesData)  
            updateDom()
        }         
    }
    // Takes in 2 ids and a JSON object, checks or creates path, sets value
    function updateElement(_chapterId, _sectionId, _elementId, elementData){
        if(pathExists(_chapterId, _sectionId, _elementId)){
            var tempCoursesData = coursesData
            tempCoursesData.courses[courseId].chapters[chapterId].sections[_sectionId].elements[_elementId] = elementData
            setCoursesData(tempCoursesData)  
            updateDom()
        }     
    }

    // Delete functions
    function deleteChapter(_chapterId){
        if(pathExists(_chapterId)){
            var tempCoursesData = coursesData
            delete(tempCoursesData.courses[courseId].chapters[_chapterId])
            setCoursesData(tempCoursesData)
            setChapterId(null)
            setSectionId(null)
            setRandomNumberState(randomNumber())
        }
    }
    function deleteSection(_chapterId, _sectionId){
        if(pathExists(_chapterId, _sectionId)){
            var tempCoursesData = coursesData
            delete(tempCoursesData.courses[courseId].chapters[_chapterId].sections[_sectionId])
            setCoursesData(tempCoursesData)
            setChapterId(null)
            setSectionId(null)
            setRandomNumberState(randomNumber())
        }
    }
    function deleteElement(_chapterId, _sectionId, _elementId){        
        if(pathExists(_chapterId, _sectionId, _elementId)){
            var tempCoursesData = coursesData
            delete(tempCoursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId])
            setCoursesData(tempCoursesData)
            setRandomNumberState(randomNumber())
        }
    }    
    // Content Functions
    function deleteContent(_chapterId, _sectionId, _elementId, index){
        if(pathExists(_chapterId, _sectionId, _elementId)){
            coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].content.pop(index)
            updateDom()
        }
    }

    // Step Functions
    function getSectionStep(_chapterId, _sectionId){
                
        if(_chapterId == null || _sectionId == null)
            return 0

        var returnStep = 0
        
        if(userDataEnsurePath(_chapterId, _sectionId)){
            returnStep = userData.courses[courseId].chapters[_chapterId].sections[_sectionId].step
            
            if(returnStep === undefined)                
                returnStep = 0            
        }
                
        return returnStep
    }    
    function setSectionStep(_chapterId, _sectionId, step){
        
        if(userDataEnsurePath(_chapterId, _sectionId)){
            var tempUserData = userData
            tempUserData.courses[courseId].chapters[_chapterId].sections[_sectionId].step = step
            setUserData(tempUserData)            
        }

    }
    // Element Steps
    function setElementStep(_chapterId, _sectionId, _elementId, step){                

        if(userDataEnsurePath(_chapterId, _sectionId, _elementId)){
            var tempUserData = userData
            tempUserData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].step = step            
            setUserData(tempUserData)                    
        }

    }
    function getElementStep(_chapterId, _sectionId, _elementId){                        

        if(_chapterId == null || _sectionId == null || _elementId == null)
            return 0

        var returnStep = 0
        
        if(userDataEnsurePath(_chapterId, _sectionId, _elementId)){            
            returnStep = userData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId].step
            
            if(returnStep === undefined)                
                returnStep = 0            
        }
                
        //console.log("returning step : "+returnStep +" for "+courseId+_chapterId + _sectionId + _elementId)        
        return returnStep
    }


    // Helper functions
    function updateDom(){
        setRandomNumberState(randomNumber())
    }
    function randomNumber(){
        return Math.floor( Math.random()*1000)
    }
    // Course Data
    function ensurePath(_chapterId, _sectionId, _elemetId){

        if(_chapterId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId] === undefined){
                var newCourseData = coursesData
                newCourseData.courses[courseId].chapters[_chapterId] = 
                {
                    title:"New Chapter",
                    sections:{
                        section1:{
                            title:"New Section",
                            elements:{
                                element1:{            
                                    title:"New Element",
                                    type:"text",
                                    content:["add content here"]
                                }
                            }
                        }
                    }
                }
                setCoursesData(newCourseData)
                return            
            }
        if(_sectionId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId] === undefined){
                var newCourseData = coursesData
                newCourseData.courses[courseId].chapters[_chapterId].sections[_sectionId] = {
                    title:"new section", 
                    elements:{
                        element1:{            
                            title:"New Element",
                            type:"text",
                            content:["add content here"]
                        }
                    }
                }
                setCoursesData(newCourseData)
                return
            
            }
        if(_elemetId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elemetId] === undefined){
                var newCourseData = coursesData
                newCourseData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elemetId] = {                                                      
                            title:"New Element",
                            type:"text",
                            content:["add content here"]                        
                }
                setCoursesData(newCourseData)
                return
            }
    }
    function pathExists(_chapterId, _sectionId, _elemetId){        

        if(coursesData.courses[courseId].chapters[_chapterId] === undefined)
            return false            
        
        if(_sectionId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId] === undefined)
                return false

        if(_elemetId != undefined)
            if(coursesData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elemetId] === undefined)
                return false
        
        return true
    }
    // User Data
    function userDataEnsurePath(_chapterId, _sectionId, _elementId){                     

        console.log("ensuring path "+_chapterId+" "+_sectionId+" "+_elementId)

        // // If all three are specified and chapter is not present (so none are present)
        // if(_sectionId != undefined && _sectionId != undefined && _elemetId != undefined)
        //     if(userData.courses[courseId].chapters[_chapterId] === undefined){
        //         var newUserData = userData
        //         newUserData.courses[courseId].chapters[_chapterId]={
        //             sections:
        //             {
        //                 [sectionId]:{
        //                     elelemts:{
        //                         [_elemetId]:{

        //                         }
        //                     }

        //                 }
        //             }
        //         }
                
        //         setUserData(newUserData)
        //         return false
        //     }

        // // If all three are specified and section and element are both not present
        // // If all three are specified and chapter is not present (so none are present)
        // if(_sectionId != undefined && _sectionId != undefined && _elemetId != undefined)
        //     if(userData.courses[courseId].chapters[_chapterId] === undefined){
        //         var newUserData = userData
        //         newUserData.courses[courseId].chapters[_chapterId].sections[_sectionId]=                
        //             {
        //                 elelemts:{
        //                     [_elemetId]:{

        //                     }
        //                 }
        //             }
        //         setUserData(newUserData)
        //         return false
        //     }

        // If only the cahpter is specified and its not there
        if(_chapterId != undefined)   
            if(userData.courses[courseId].chapters[_chapterId] === undefined){
                var newUserData = userData
                newUserData.courses[courseId].chapters[_chapterId] = 
                {                   
                    sections:{                        

                    }
                }
                setUserData(newUserData)                
                return false
            }

        // If chapter and section are specified and section is not present
        if(_sectionId != undefined)
            if(userData.courses[courseId].chapters[_chapterId].sections[_sectionId] === undefined){
                var newUserData = userData
                newUserData.courses[courseId].chapters[_chapterId].sections[_sectionId] = {                    
                    elements:{
                        
                    }
                }
                setUserData(newUserData)
                return false
            }
        
        // If all three are specified and only element is not present
        if(_elementId != undefined)
            if(userData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId] === undefined){
                var newUserData = userData
                newUserData.courses[courseId].chapters[_chapterId].sections[_sectionId].elements[_elementId] = {}
                setUserData(newUserData)
                return false
            }
        
        
        console.log("found path")


        // Returns true if path already existed
        return true
    }
    function userDataPathExists(_chapterId, _sectionId, _elemetId){
        return false

    }

    return (
    <div className='page'>
        {displayPage()}
    </div>
  )
}

export default Courses