import React, { useState } from 'react'
import './makesortable.css'

const MakeSortable = ({dataComponents, setDataComponents, setDraggingItem, draggingItem}) => { //id, text, color
  const [isDragging, setIsDragging] = useState(false)
  const [highlighter, setHighlighter] = useState(0)
  const [direction, setDirection] = useState(0)

  const highlighterStyle = {
    // visibility: highlighter ? "visible" : "hidden"
  }
  function handleDragBoxMouseDown() {
    setIsDragging(true)
  }
  function handleDragStart(e, item, index) {
    setDraggingItem(item)
    setHighlighter(index)
    console.log(index, "dragstartindex")
  }
  function handleDragEnter(index) {
  }
  // function handleDragEnd() {
  //   setDraggingItem(null)
  //   setIsDragging(false)
  //   setHighlighter(false)
  // }
  function handleDragOver(e, item, index) {
    e.preventDefault()
    if(index === highlighter)
      document.getElementById(index).style.setProperty("visibility", "hidden")
    else document.getElementById(index+direction).style.setProperty("visibility", "visible")
  }
  function handleDragLeave(index) {
    document.getElementById(index).style.setProperty("visibility", "hidden")
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
    setHighlighter(false)
  }
  function handleMouseMove(e) {
    if(isDragging) {
      console.log("triggered", e.movementX)
      if(e.movementY > 0) 
        setDirection(1)      //top to bottom is positive. need to add 1
      else setDirection(0)
    }
  }
  
  return (
    <div onMouseMove={(e) => handleMouseMove(e)}>
      {dataComponents.map((item,index) => {
          return (
            <div key={item.id} >
              <hr id={index} style={highlighterStyle}></hr>
              <div key={item.id} className='single-div-class' 
                  style={{backgroundColor:item.color}}
                  draggable={isDragging ? 'true' : 'false'}
                  onDragStart={(e) => handleDragStart(e, item, index)}
                  onDragEnter={() => handleDragEnter(index)}
                  // onDragEnd={handleDragEnd}
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
      <hr id={dataComponents.length}></hr>
    </div>
  )
}

export default MakeSortable