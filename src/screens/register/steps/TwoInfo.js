import React from 'react'
import '../style.css'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import RegisterBackgroundImage from '../../../components/registerBackgroundImage'
import Button from '../../../components/button'

const TwoInfo = ({ history }) => {
  const handleClick = () => {
    localStorage.setItem('newUserStep', '2-password')
    history.push('/register')
  }

  return (
    <>
      <div className='container'>
        <div className='register-container'>
          <div className='register-text'>
            <p className='register-step-counter'>Step 2 of 4</p>
            <h1 className='heavy-title'>Setting up your account.</h1>
          </div>
          <div className='register-box-container'>
            <RegisterBackgroundImage url='/assets/twoInfoImg.jpeg' />
            <div className='register-text-container'>
              <div className='register-list-text'>
                <PeopleAltIcon className='register-list-item-icon large' />
                <p>SeaFactory is personalized for your dive center. Create a password to access SeaFactory on any device at any time.</p>
                <div className='register-cta-button'>
                  <Button onClick={handleClick} category='cta' type='button' fontType='bold' text='Continue' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TwoInfo
