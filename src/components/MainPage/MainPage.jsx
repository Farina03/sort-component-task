import React, { useState } from 'react'
import { data } from '../../data'
import './mainpage.css'
import MakeSortable from '../MakeSortable/MakeSortable'
import SingleComponent from '../SingleComponent/SingleComponent'

const MainPage = () => {
  const [dataComponents, setDataComponents] = useState(data)
  const [draggingItem, setDraggingItem] = useState(null)
  // const [componentArr, setComponentArr] = useState(null)
  // let temp = []
  // temp = dataComponents.map(item => {
  //   return (
  //     <SingleComponent key={item.id} id={item.id} tex={item.text} color={item.color} />
  //   )
  // })
  // setComponentArr(temp)
  // console.log(temp)
  return (
    <div className='mainpage'>
        Sort the items!
        {/* {
          dataComponents.map(item => {
            return (
              <SingleComponent key={item.id} />
            )
          })
        } */}
        <MakeSortable dataComponents={dataComponents} 
                      setDataComponents={setDataComponents}
                      setDraggingItem={setDraggingItem}
                      draggingItem={draggingItem}/>
    </div>
  )
}

export default MainPage


{/* <MakeSortable items={[]} arr={data} onSort={(arr)=>{setdata(arr)}}>

</MakeSortable> */}