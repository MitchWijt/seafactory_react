import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingCircle = (props) => {
    const color = props.color ? props.color : '#ffffff';
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: color }} spin />;
    return (
        <>
            <Spin indicator={antIcon} />
        </>
    )
}



export default LoadingCircle