import React from 'react'
import stl from '../Images/success-through-learning.png'
import lighthouse from '../Images/cape_seal_white-no-year.png'
import '../Styles/Home.css'
import Card from '../Components/Card'
import cardImage1 from '../Images/prog-big-ins.png'
import cardImage2 from '../Images/prog-big-re.png'
import cardImage3 from '../Images/prog-big-le.png'
import cardImage4 from '../Images/prog-big-mlo.png'
import logo from '../Images/cape_seal_blue-no-year.png'
import quoteImage1 from '../Images/landing-img-2.jpg'
import quoteImage2 from '../Images/landing-img-3.jpg'
import waves from '../Images/waves-big.png'
import rightImage from '../Images/cut-out-photo-for-website.png'

function Home(props) {
  return (
    <div className='home'>
        This is the master branch
        <div className='banner'>
            <div className='bannerContainer'>
                <div><img src={stl}></img></div>
                <div className='line'></div>
                <div className='bannerText'>Education is a gateway to opportunity.</div>
                <div>
                    <div className='selectionBar'>
                        <div className='selectionBarHalf selectionBarLeft'>
                            Career Selection
                        </div>
                        <div className='selectionBarHalf selectionBarRight'>
                            <select>
                                <option value="realestate">Real Estate</option>
                                <option value="realestate">Real Estate</option>
                                <option value="realestate">Real Estate</option>
                                <option value="realestate">Real Estate</option>
                            </select>
                        </div>                
                    </div>          
                    <div className='selectionBar'>
                        <div className='selectionBarHalf selectionBarLeft'>
                            Career Selection
                        </div>
                        <div className='selectionBarHalf selectionBarRight'>
                            <select>
                                <option value="realestate">Real Estate</option>
                                <option value="realestate">Real Estate</option>
                                <option value="realestate">Real Estate</option>
                                <option value="realestate">Real Estate</option>
                            </select>
                        </div>                
                    </div>            
                </div>
                <div>
                    <a className='button' onClick={()=>props.setPage("Courses")}>Get Started</a>
                </div>
                <div className='bannerLogo'><img src={lighthouse}></img></div>
            </div>           
        </div>
        <div className='cards'>
                <Card
                    image={cardImage1}            
                >
                </Card>
                <Card
                    image={cardImage2}
                >
                </Card>
                <Card
                    image={cardImage3}
                >
                </Card>
                <Card
                    image={logo}
                    styles=' conditionalDisplay'
                >
                </Card>
                <Card
                    image={cardImage4}
                >
                </Card>
                <Card
                    image={logo}
                    styles=' conditionalDisplay'
                >
                </Card>
            
        </div>   
        <div className='partnershipWrapper'>
            <div className='partnership'>
                <div className='left'>
                    <img src={waves}></img>
                    <div>Corperate Partnership Program</div>
                    <div className='button'>Partnership Benefits</div>
                </div>
                <div className='right'>
                    <img src={rightImage}></img>
                    <div className='rightText'>A partnership with Cape School ensures hat your prople obtain the bestt educaion at the lowest price.</div>
                </div>
            </div>
        </div>
        <div className='quotes'>
            <div className='quoteHalf'>
                <img src={quoteImage1}></img>
                <div className='quoteText'>
                    "This is a Quote about a thing"
                    <div className='quoteName'>- Nobody Special</div>
                </div>
            </div>
            <div className='quoteHalf'>
                <img src={quoteImage2}></img>
                <div className='quoteText'>
                    "This is a Quote about a thing"
                    <div className='quoteName'>- Nobody Special</div>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default Home