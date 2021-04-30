import React from 'react'
import '../style.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import RegisterBackgroundImage from '../../../components/registerBackgroundImage'
import Button from '../../../components/button'

const OneInfo = ({ history }) => {
  const handleClick = () => {
    localStorage.setItem('newUserStep', '1-plans')
    history.push('/register')
  }

  return (
    <>
      <div className='container'>
        <div className='register-container'>
          <div className='register-text'>
            <p className='register-step-counter'>Step 1 of 4</p>
            <h1 className='heavy-title'>Choose your plan.</h1>
          </div>
          <div className='register-box-container'>
            <RegisterBackgroundImage url='/assets/oneInfoImg.jpeg' />
            <div className='register-text-container'>
              <div className='register-list-text'>
                <div className='register-list-item'>
                  <CheckCircleOutlineIcon className='register-list-item-icon' />
                  <p>Easy access from any device</p>
                </div>
                <div className='register-list-item'>
                  <CheckCircleOutlineIcon className='register-list-item-icon' />
                  <p>Personlized check-in url</p>
                </div>
                <div className='register-list-item'>
                  <CheckCircleOutlineIcon className='register-list-item-icon' />
                  <p>Daily personalized dashboard</p>
                </div>
                <div className='register-cta-button'>
                  <Button onClick={handleClick} category='cta' type='button' fontType='bold' text='See all plans' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OneInfo
