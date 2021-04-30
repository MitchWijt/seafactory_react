import React from 'react'

const DataTable = (props) => {
  const maxHeight = props.maxHeight ? props.maxHeight : '600px'
  return (
    <div className='container contentBox'>
      <div style={{ maxHeight: maxHeight }} className='table-body-data'>
        {props.data.length > 0
          ? <table className='table'>
            <thead>
              <tr>
                {props.titles.map((title) => <SingleDataTitle key={title} title={title} />)}
              </tr>
            </thead>
            <tbody>
              {props.data.map((data) => <props.singleColumn {...data} />)}
            </tbody>
          </table>
          : <div className='center'>
            <p id='no-results-text'>No results...</p>
            </div>}
      </div>
    </div>
  )
}

const SingleDataTitle = (props) => {
  return (
    <>
      <th className='column-title'>{props.title}</th>
    </>
  )
}

export default DataTable
