import React, {useState} from 'react'
import Button from '../button';
import './style.css'
import {Divider} from 'antd';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';
import {handleLogout} from '../../services/auth';

const Header = (props) => {
    return props.userState.isLoggedIn ? <HeaderLoggedIn/> : <HeaderLoggedOut/>;
}

const HeaderLoggedOut = () => {
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
                    <Link to='/login/admin'>
                        <Button text='Sign in' category='cta' type='button' fontType='bold' fontSize='15px'/>
                    </Link>
                </div>
             </div>
        </div>
    )
}

const HeaderLoggedIn = () => {
    const [menuShown, setMenuShown] = useState(false);

    return (
        <div className='header-container'>
            <div className="header">
                <Link to='/'>
                    <span id='seafactory-logo'>SeaFactory</span>
                </Link>
                <div className='account-badge' onClick={() => setMenuShown(!menuShown)}>
                    <PersonIcon className='account-icon'/>
                    {menuShown ? 
                        <div className='account-menu'>
                            <Button onClick={handleLogout} text='Logout' category='cta' type='button' fontType='bold' fontSize='15px'/>
                        </div> 
                    : '' }
                </div>
                
             </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userState: {...state.userStateReducer}
    }
}

export default connect(
    mapStateToProps
)(Header);