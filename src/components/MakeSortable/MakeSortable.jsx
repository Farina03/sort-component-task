import React, { useState } from 'react'
import './makesortable.css'

const MakeSortable = ({dataComponents, setDataComponents}) => { //id, text, color
  // const [color, setColor] = useState("white")
  // const singleDivStyle = {
  //   backgroundColor: color
  // }
  const [isDragging, setIsDragging] = useState(false)
  // function handleDragBoxMouseUp() {
  //   setIsDragging(false)
  // }
  function handleDragBoxMouseDown() {
    setIsDragging(true)
  }
  function handleDragStart(e, item) {
    setDataComponents(prevData => {
      return ({
        ...prevData,
        draggingItem : item
      })
    })
  }
  function handleDragEnd() {
    setDataComponents(prevData => {
      return {
        ...prevData,
        draggingItem: null
      }
    })
    setIsDragging(false)
  }
  function handleDragOver(e) {
    e.preventDefault()
  }
  function handleDrop(e, targetItem) {
    const {draggingItem, dataItems} = dataComponents
    if(!draggingItem) return

    const currentIndex = dataItems.indexOf(draggingItem)
    const targetIndex = dataItems.indexOf(targetItem)
    if(currentIndex !== -1 && targetIndex !== -1) {
      dataItems.splice(currentIndex, 1)
      dataItems.splice(targetIndex, 0, draggingItem)
      setDataComponents(prevData => {
        return {
          ...prevData,
          dataItems
        }
      })
    }
    setIsDragging(false)
  }
  // console.log(dataComponents)
  return (
    // <div id={id} style={singleDivStyle} className='single-div-class'>
    <div>
      {
        dataComponents.dataItems.map((item,index) => {
          //setColor(item.color)
          return (
            <div key={item.id} id={item.id} className='single-div-class' 
                  style={{backgroundColor:item.color}}
                  draggable={isDragging ? 'true' : 'false'}
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, item)}>
                  {/* // onMouseUp={handleDragBoxMouseUp}> */}
              <div className='drag-div' 
                  onMouseDown={handleDragBoxMouseDown}>
              </div>
              {item.text}
            </div>
          )
        })
      }
        {/* <div className='drag-div'> */}

        {/* </div> */}
        {/* {text} */}
    </div>
  )
}

export default MakeSortable