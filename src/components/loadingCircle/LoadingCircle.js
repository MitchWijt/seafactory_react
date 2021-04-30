import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const LoadingCircle = (props) => {
  const color = props.color ? props.color : '#ffffff'
  const fontSize = props.fontSize ? props.fontSize : 24
  const antIcon = <LoadingOutlined style={{ fontSize: fontSize, color: color }} spin />
  return (
    <>
      <Spin indicator={antIcon} />
    </>
  )
}

export default LoadingCircle
