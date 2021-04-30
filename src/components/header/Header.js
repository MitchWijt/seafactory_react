import React from 'react'
import Button from '../button'
import './style.css'
import { Divider, Row, Col, DatePicker } from 'antd'
import Hr from '../hr'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PersonIcon from '@material-ui/icons/Person'
import { handleLogout } from '../../services/auth'
import fetchCdnImage from '../../services/cdnImage'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

import { setMenuState, setSearchFormState } from '../../redux/actions/headerActions'
import { Formik } from 'formik'

import moment from 'moment-timezone'

const Header = (props) => {
  return props.userState.isLoggedIn ? <HeaderLoggedIn {...props} /> : <HeaderLoggedOut />
}

const HeaderLoggedOut = () => {
  return (
    <div className='header-container'>
      <div className='header'>
        <Link to='/'>
          <span id='seafactory-logo'>SeaFactory</span>
        </Link>
        <div className='nav-menu'>
          <Link to='/'>Customers</Link>
          <Link to='/'>About us</Link>
          <Divider className='divider' type='vertical' />
          <Link to='/login/admin'>
            <Button text='Sign in' category='cta' type='button' fontType='bold' fontSize='15px' />
          </Link>
        </div>
      </div>
    </div>
  )
}

const HeaderLoggedIn = (props) => {
  const { setMenuState, setSearchFormState, menuShown, searchFormShown } = props

  const logo = userHasCompanyLogo(props.userState.settings.logo_url) ? <img src={fetchCdnImage(props.userState.settings.logo_url)} alt='logo' /> : <span id='seafactory-logo'>SeaFactory</span>

  return (
    <>
      <div className='header-container'>
        <Row gutter={16} className='ai-center'>
          <Col span={8}>
            <div className='d-flex fd-row'>
              <div className='menuButtons d-flex fd-row'>
                <button type='button' className='header-menu-button'><div className='d-flex jc-center'><HomeIcon className='header-icon' /></div></button>
                <button type='button' className='header-menu-button'><div className='d-flex ai-center'><MenuIcon className='header-icon' /> <span id='navButttonText'>Menu</span></div></button>
                <button onClick={() => setSearchFormState(!searchFormShown)} type='button' className='header-menu-button'><div className='d-flex ai-center'><SearchIcon className='header-icon' /><span id='navButttonText'>Search guests</span></div></button>
              </div>

            </div>
            {searchFormShown
              ? <div className='searchForm'>
                <Formik
                  validateOnBlur={false}
                  validateOnChange={false}
                  initialValues={{ name: '', depDate: '' }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    if (values.name && values.depDate) {
                      window.location.href = `/guestlist?name=${values.name}&dep_date=${moment(values.depDate).format('YYYY-MM-DD')}`
                    } else if (values.name && !values.depDate) {
                      window.location.href = `/guestlist?name=${values.name}`
                    } else if (!values.name && values.depDate) {
                      window.location.href = `/guestlist?dep_date=${moment(values.depDate).format('YYYY-MM-DD')}`
                    } else {
                      window.location.href = '/guestlist'
                    }
                    setSubmitting(false)
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit
                  }) => (
                    <form onSubmit={handleSubmit} className='d-flex fd-row'>
                      <input className='formInputHeader' placeholder='Name' type='text' name='name' value={values.name} onChange={handleChange} />
                      <DatePicker className='formInputHeader' format='DD-MM-YYYY' onChange={(date) => values.depDate = date} placeholder='Dep. date' inputReadOnly />
                      <Button type='submit' category='cta' fontType='bold' text='Search' />
                    </form>
                  )}
                </Formik>
              </div>
              : <></>}
          </Col>
          <Col span={8} className='center'>
            <a href='/dashboard'>
              {logo}
            </a>
          </Col>
          <Col span={8} className='right'>
            <div className='account-badge' onClick={() => setMenuState(!menuShown)}>
              <PersonIcon className='account-icon' />
              {menuShown
                ? <div className='account-menu'>
                  <Button onClick={handleLogout} text='Logout' category='cta' type='button' fontType='bold' fontSize='15px' />
                  </div>
                : ''}
            </div>
          </Col>
        </Row>
      </div>
      <Hr />
    </>
  )
}

const userHasCompanyLogo = (logoUrl) => {
  return !!logoUrl
}

const mapStateToProps = (state) => {
  return {
    userState: { ...state.userStateReducer },
    menuShown: state.headerReducer.menuShown,
    searchFormShown: state.headerReducer.searchFormShown
  }
}

const mapDispatchToProps = { setMenuState, setSearchFormState }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
