import React from 'react'
import './style.css';

const Button = (props) => {
    const fontSize = props.fontSize ? props.fontSize : '16px';
    const fontType = props.fontType === 'bold' ? 'Corbert Bold' : 'Corbert';

    return (
        props.type === 'cta' ? 
            <button className='ctaButton' style={{fontSize: fontSize, fontFamily: fontType}} onClick={props.onClick}>{props.text}</button> 
            : 
            <button className='regularButton' style={{fontSize: fontSize, fontFamily: fontType}} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button