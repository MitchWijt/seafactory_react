import React from 'react';

const DataList = (props) => {
    let listItems = [];

    for(const key of Object.keys(props.data)){
        listItems.push(<ListItem key={key} indication={key} value={props.data[key]}/>); 
    }

    return (
        <div className='d-flex fd-column'>
               {listItems}
        </div>
       
    )
}

const ListItem = (props) => {
    return (
        <div className='d-flex jc-between ai-center'>
            <p className='bold'>{props.indication}</p>
            <p>{props.value}</p>
        </div>
    )
}

export default DataList