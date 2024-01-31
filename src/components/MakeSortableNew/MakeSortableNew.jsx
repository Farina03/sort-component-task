import React, { useEffect, useState } from 'react'

const MakeSortableNew = ({
    dataComponents, 
    setDataComponents,
    isDragging,
    // setIsDragging,
    children
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [toUpperHalf, setToUpperHalf] = useState(null);
  const [toLowerHalf, setToLowerHalf] = useState(null)

  const handleDragStart = (e, id, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, id, index) => {
    e.preventDefault();

    setTargetIndex(index);
    const targetElement = e.currentTarget
    // console.log(index)
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    
    const componentRect = e.target.getBoundingClientRect();
    const componentHeight = componentRect.height;
    const componentLeft = componentRect.left;
    const componentRight = componentRect.right;
    const componentTop = componentRect.top;
    const componentBottom = componentRect.bottom //componentTop + componentHeight;

    const distanceFromTop = mouseY - componentTop;
    const distanceFromBottom = componentBottom - mouseY;

    const percentageFromTop = (distanceFromTop / componentHeight) * 100;
    const percentageFromBottom = (distanceFromBottom / componentHeight) * 100;

    let indicatorArray = [...document.getElementsByClassName("indicator")]
    indicatorArray.forEach(item => {
      item.style.setProperty("visibility", "hidden")
    })
    let divArray = [...document.getElementsByClassName("single-div-class")]
      divArray.forEach(item => {
      item.style.opacity = "1"
    })
    document.getElementById(`div${index}`).style.opacity = "40%"
    if(index >= 0 && index <= dataComponents.length-1 ) {
      let indicatorArray = [...document.getElementsByClassName("indicator")]
      indicatorArray.forEach(item => {
      item.style.setProperty("visibility", "hidden")
    })
    }

    if(draggedIndex !== index && (mouseX >= componentLeft-50 && mouseX <= componentRight+50)) {
      if(percentageFromTop < 50) {
        document.getElementById(`upper${index}`).style.setProperty("visibility", "visible")
        if(draggedIndex <= index)
          setTargetIndex(Math.max(0, index-1))
        // else setTargetIndex(index)
        else if(draggedIndex >= index)
          setTargetIndex(Math.max(0, index))
        // else setTargetIndex(index)                    //target index 0 => visibility hidden if mouseY < componentTop-20
        // setToUpperHalf(index)                         ////target index length-1 => visibility hidden if mouseY > componentBottom+20
      }
      else if(percentageFromBottom < 50) {
        document.getElementById(`lower${index}`).style.setProperty("visibility", "visible")
        if(draggedIndex >= index) {
          setTargetIndex(Math.min(dataComponents.length-1, index+1))
        }
        // else setTargetIndex(index)
        else if(draggedIndex <= index) {
          setTargetIndex(Math.min(dataComponents.length-1, index))
        }
        // else setTargetIndex(index)
        // setToLowerHalf(Math.max(dataComponents.length, index+1))  
      }
      else {
        document.getElementById(`lower${index}`).style.setProperty("visibility", "hidden") 
      }
    }
  };

  const handleDrop = (e, id) => {
    e.preventDefault();

    if (draggedIndex !== null && targetIndex !== null) {
      const updatedComponents = [...dataComponents];
      const [draggedComponent] = updatedComponents.splice(draggedIndex, 1);
      updatedComponents.splice(targetIndex, 0, draggedComponent);

      setDataComponents(updatedComponents);
      setDraggedIndex(null);
      setTargetIndex(null);
    }
    else {
      setDataComponents(setDataComponents)
      setDraggedIndex(null)
      setTargetIndex(null)
    }
    let divArray = [...document.getElementsByClassName("single-div-class")]
      divArray.forEach(item => {
      item.style.opacity = "1"
    })
    let indicatorArray = [...document.getElementsByClassName("indicator")]
    indicatorArray.forEach(item => {
      item.style.setProperty("visibility", "hidden")
    })
  };
  function handleDragEnd() {
    setDraggedIndex(null);
    setTargetIndex(null);
    let divArray = [...document.getElementsByClassName("single-div-class")]
      divArray.forEach(item => {
      item.style.opacity = "1"
    })
    let hrArray = [...document.getElementsByClassName("indicator")]
    hrArray.forEach(item => {
      item.style.setProperty("visibility", "hidden")
    })
  }
 
  return (
    <>
      {children.map((item, index) => (
        <div
          key={index}
          // style={{backgroundColor:'red'}}
          onDragStart={(e) => handleDragStart(e, item.key, index)}
          onDragOver={(e) => handleDragOver(e, item.key, index)}
          onDragEnd={handleDragEnd}
          onDrop={(e) => handleDrop(e, item.key, index)} >
          {item}
        </div>
      ))}  
    </>
  )
}

export default MakeSortableNew