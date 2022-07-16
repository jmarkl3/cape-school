import React from 'react'
import logoBlue from '../Images/cape_seal_blue-no-year.png'
import wave from "../Images/wave.png"
import "../Styles/Contact.css"

function Contact() {
  return (
    <div className='contact'>        
        <div className='logoArea'>
            <img src={logoBlue}></img>
            <div className='logiAreaText'>
                Contact Us
                <img src={wave}></img>
            </div>
            <img src={logoBlue}></img>
        </div>        
        <div className='infoArea'>
            <div className='infoAreaSection'>
                <div className='contactInfo'>
                    <a href='tel:+1-800-831-9135'>
                    # 800-831-9135
                    </a>
                </div>
                <div className='lineInfoArea'></div>
                <div className='infoAreaLabel'>
                    Phone
                </div>
            </div>
            <div className='infoAreaSection'>
                <div className='contactInfo'>
                    <a href='mailto:info@capeschool.com'>
                        info@capeschool.com
                    </a>
                </div>
                <div className='lineInfoArea'></div>
                <div className='infoAreaLabel'>
                    Email
                </div>
            </div>            
        </div>
        <div className='contactForm'>
            <input placeholder='name'></input>
            <input placeholder='phone'></input>
            <input placeholder='email'></input>
            <textarea placeholder='message'></textarea>
            <button>Send</button>
        </div>

    </div>
  )
}

export default Contact