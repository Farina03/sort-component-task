import React, { useState } from 'react'
import './makesortable.css'

const MakeSortable = ({dataComponents, setDataComponents, setDraggingItem, draggingItem}) => { //id, text, color
  const [isDragging, setIsDragging] = useState(false)
  const [direction, setDirection] = useState(0)
  const [prevPosition, setPrevPosition] = useState(0)
  const [dragStart, setDragStart] = useState(false)

  const highlighterStyle = {
    backgroundColor: "#81689D",
    height: "4px",
    border: "none"
  }
  function handleDragBoxMouseDown() {
    setIsDragging(true)
  }
  function handleDragStart(e, item, index) {
    setDraggingItem(item)
    setDragStart(true)
  }
  // function handleDragEnter(index) {
  // }
  function handleDragEnd() {
    setDraggingItem(null)
    setIsDragging(false)
    setPrevPosition(0)
    setDirection(0)
    for(let i = 0; i <= dataComponents.length; i++) {
      document.getElementById(i).style.setProperty("visibility", "hidden")
    }
  }
  function handleDragOver(e, item, index) {
    e.preventDefault()
    if(index === dataComponents.indexOf(draggingItem) && dragStart) { 
      document.getElementById(index).style.setProperty("visibility", "hidden")
      document.getElementById(index+1).style.setProperty("visibility", "hidden")
    }
    else if(index < prevPosition) {
      setDragStart(false)
      document.getElementById(index).style.setProperty("visibility", "visible")
      setDirection(0)
    }
    else if(index > prevPosition) {
      setDragStart(false)
      document.getElementById(index+1).style.setProperty("visibility", "visible")
      setDirection(1)
    }
  }
  function handleDragLeave(index) {
    setPrevPosition(index)
    document.getElementById(index+direction).style.setProperty("visibility", "hidden")
  }
  function handleDrop(e, targetItem, index) {
    if(!draggingItem) return
    const currentIndex = dataComponents.indexOf(draggingItem)
    const targetIndex = dataComponents.indexOf(targetItem)
    if(currentIndex !== -1 && targetIndex !== -1) {
      dataComponents.splice(currentIndex, 1)
      dataComponents.splice(targetIndex, 0, draggingItem)
      setDataComponents(dataComponents)
    }
    for(let i = 0; i <= dataComponents.length; i++) {
      document.getElementById(i).style.setProperty("visibility", "hidden")
    }
    setDraggingItem(null)
    setIsDragging(false)
    setPrevPosition(0)
    setDirection(0)
  }
  
  return (
    <div>
      {dataComponents.map((item,index) => {
          return (
            <div key={item.id} >
              <hr id={index} style={highlighterStyle}></hr>
              <div key={item.id} className='single-div-class' 
                  style={{backgroundColor:item.color}}
                  draggable={isDragging ? 'true' : 'false'}
                  onDragStart={(e) => handleDragStart(e, item, index)}
                  // onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, item, index)}
                  onDragLeave={() => handleDragLeave(index)}
                  onDrop={(e) => handleDrop(e, item, index)}>
              <div className='drag-div' 
                  onMouseDown={handleDragBoxMouseDown}>
              </div>
              {item.text}
            </div>
            </div>
          )
        })
      }
      <hr id={dataComponents.length} style={highlighterStyle}></hr>
    </div>
  )
}

export default MakeSortable