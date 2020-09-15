import React from 'react'
import './style.css';
import LoadingCircle from '../loadingCircle';


const Button = (props) => {
    const fontSize = props.fontSize ? props.fontSize : '16px';
    const fontType = props.fontType === 'bold' ? 'Corbert Bold' : 'Corbert';
    const isLoading = props.isLoading ? props.isLoading : false;
    let className;
    switch(props.category){
        case 'cta' : className = 'ctaButton';
        break;
        case 'table-cta': className = 'ctaButton table';
        break;
        case 'regular' : className = 'regular';
        break;
        default: className = 'cta';
    }

    return (
        <button type={props.type} className={className} style={{fontSize: fontSize, fontFamily: fontType}} onClick={props.onClick}>{isLoading ? <LoadingCircle/> : props.text}</button>             
    )
}

export default Button