import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer'>
                <div className='footer-link-group'>
                    <Link className='footer-link' to='/'>SeaFactory</Link>
                </div>
                <div className='footer-link-group flex'>
                    <Link className='footer-link' to='/'>Contact us</Link>
                    <Link className='footer-link' to='/'>Terms of Use</Link>
                    <Link className='footer-link' to='/'>Privacy</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;