import React from 'react'
import LoadingCircle from '../loadingCircle'
import './style.css'

const LoadingScreen = () => {
  return (
    <div className='loading-container'>
      <div className='loadingIcon'>
        <LoadingCircle fontSize={50} color='#FF6F61' />
      </div>
    </div>
  )
}

export default LoadingScreen
