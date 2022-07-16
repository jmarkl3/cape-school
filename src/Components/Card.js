import React from 'react'

function Card(props) {
  return (
    <div className={'card '+props.styles}>
        <img src={props.image}></img>
        <div className='cardLink'><a>Learn More</a></div>
    </div>
  )
}

Card.defaultProps = {
    image:null,
    styles:" ",
}

export default Card