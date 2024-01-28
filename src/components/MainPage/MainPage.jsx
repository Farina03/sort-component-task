import React, { useState } from 'react'
import { data } from '../../data'
import './mainpage.css'
import MakeSortable from '../MakeSortable/MakeSortable'

const MainPage = () => {
  const [dataComponents, setDataComponents] = useState(data)
  const [draggingItem, setDraggingItem] = useState(null)
  return (
    <div className='mainpage'>
        Sort the items!
        <MakeSortable dataComponents={dataComponents} 
                      setDataComponents={setDataComponents}
                      setDraggingItem={setDraggingItem}
                      draggingItem={draggingItem}/>
    </div>
  )
}

export default MainPage