import React, { useState } from 'react'
import { data } from '../../data'
import './mainpage.css'
import MakeSortable from '../MakeSortable/MakeSortable'

const MainPage = () => {
  const [dataComponents, setDataComponents] = useState(data)
  return (
    <div className='mainpage'>
        Sort the items!
        <MakeSortable dataComponents={dataComponents} setDataComponents={setDataComponents}/>
        {/* {data.map(item => {
            return(
                <MakeSortable key={item.id} id={item.id} 
                            text={item.text} color={item.color}/>)
        })} */}
    </div>
  )
}

export default MainPage