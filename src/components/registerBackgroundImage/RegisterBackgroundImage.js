import React from 'react'
import './style.css'
import fetchCdnImage from '../../services/cdnImage'

const RegisterBackgroundImage = (props) => {
  const url = fetchCdnImage(props.url)

  return (
    <>
      <div className='register-img-container' style={{ backgroundImage: `url(${url})` }} />
    </>
  )
}

export default RegisterBackgroundImage
