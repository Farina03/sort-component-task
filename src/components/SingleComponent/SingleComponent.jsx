import React from 'react'
import '../MakeSortable/makesortable.css'

const SingleComponent = ({id, text, color}) => {
  return (
    <div style={{backgroundColor:color}} className='single-div-class'>{text}</div>
  )
}

export default SingleComponent