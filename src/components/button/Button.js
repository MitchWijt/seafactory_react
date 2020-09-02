import React from 'react'
import './style.css';
import LoadingCircle from '../loadingCircle';


const Button = (props) => {
    const fontSize = props.fontSize ? props.fontSize : '16px';
    const fontType = props.fontType === 'bold' ? 'Corbert Bold' : 'Corbert';
    const isLoading = props.isLoading ? props.isLoading : false;

    return (
        props.category === 'cta' ? 
            <button type={props.type} className='ctaButton' style={{fontSize: fontSize, fontFamily: fontType}} onClick={props.onClick}>{isLoading ? <LoadingCircle/> : props.text}</button> 
            : 
            <button type={props.type} className='regularButton' style={{fontSize: fontSize, fontFamily: fontType}} onClick={props.onClick}>{props.text}</button>
    )
}

export default Button