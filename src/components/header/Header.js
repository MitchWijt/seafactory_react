import React from 'react'
import Button from '../button';
import './style.css'
import {Divider} from 'antd';
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div className='header-container'>
            <div className="header">
                <Link to='/'>
                    <span id='seafactory-logo'>SeaFactory</span>
                </Link>
                <div className='nav-menu'>
                    <Link to='/'>Customers</Link>
                    <Link to='/'>About us</Link>
                    <Divider className='divider' type='vertical'/>
                    <Link to='/'>Login</Link>
                    <Link to='/'>
                        <Button text='Sign in' category='cta' type='button' fontType='bold' fontSize='15px'/>
                    </Link>
                </div>
             </div>
        </div>
           
        
    )
}

export default Header