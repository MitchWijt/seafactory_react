import React from 'react';
import { Modal } from 'antd';


const DataModel = (props) => {
    return (
        <>
            <Modal
                visible={props.visible}
                title={props.title}
                onCancel={props.onCancel}
                footer={null}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    )
}

export default DataModel