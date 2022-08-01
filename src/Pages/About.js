import React from 'react'
import ourStory from '../Images/ourstory.png'
import smallWave from "../Images/wave.png"
import "../Styles/About.css"

function About() {
  return (
    <div className='about'> 
      <div className='aboutBanner'>
        <img src={ourStory}></img>
      </div>
      <div className='aboutPhilosophy'>
        <div className='phTitle'>PHILOSOPHY</div>
        <div><img src={smallWave}></img></div>
        <div className='phText'>            
            <div className='phSpan1'>Education is a resource, and a gateway to opportunity.</div>
            <div className='phSpan2'>We endeavor to connect our students with the tools for the betterment of lives, families, and communities.</div>
        </div>
      </div>
      <div className='aboutText'>
        <div className='aboutTextHalf athL'>
            <p>&ensp;&ensp;Cape is a family owned and operated company and that’s rare these days in our industry. The Cape companies were first formed in 1993 in our home state, the Commonwealth of Virginia. Cape was originally an acronym for Commonwealth Academy of Professional Education. Virginia is one of four states which are officially called commonwealths (the other three are Pennsylvania, Kentucky, and Massachusetts).</p>
            <p>&ensp;&ensp;As we expanded to offer our products across the country we decided to change the company name to Cape. In addition to our primary offices in Virginia, Cape also has offices in New York City, Philadelphia and Atlanta and we offer our educational products nationwide. We chose the lighthouse as our logo because it can be tricky and confusing navigating the mandatory requirements to obtain or renew a professional license.</p>
        </div>
        <div className='aboutTextHalf athR'>
            <p>&ensp;&ensp;The lighthouse symbolizes a shining beacon to eliminate the obstacles that lay in our student’s path to obtain and renew their license. Cape offers the highest quality education available at the best prices. We offer more choices (classroom, textbooks, online, teleconference and webinar) than any other provider.</p>                        
            <p>&ensp;&ensp;Customer service and satisfaction has always been our #1 priority. We will never take our customers for granted and appreciate every single opportunity to serve their educational needs. Without our customers, there is no Cape. We work tirelessly to ensure we earn our customer’s current and future business. Our student’s success is our success.</p>
        </div>
        <div className='aboutBottomText'>
            Are you ready to get started?
        </div>
        <div>
            <div className='button'>Enroll Today</div>
        </div>
        <div className='aboutBottomText2'>
            Have Questions? Call us at # 800-831-9135 or reach us by email at info@capeschool.com
        </div>
      </div>
    </div>
  )
}

export default About