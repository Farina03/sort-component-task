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
  const [prevIndicator, setPrevIndicator] = useState(null)

  const handleDragStart = (e, id, index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e, id, index) => {
    e.preventDefault();

    setTargetIndex(index);

    const mouseY = e.clientY;
    const componentRect = e.target.getBoundingClientRect();
    const componentHeight = componentRect.height;
    const componentTop = componentRect.top;
    const componentBottom = componentTop + componentHeight;

    const distanceFromTop = mouseY - componentTop;
    const distanceFromBottom = componentBottom - mouseY;

    const percentageFromTop = (distanceFromTop / componentHeight) * 100;
    const percentageFromBottom = (distanceFromBottom / componentHeight) * 100;

    if(draggedIndex !== index) {
      if(percentageFromTop < 50) {
      document.getElementById(`upper${index}`).style.setProperty("visibility", "visible")

      setPrevIndicator(prevItem => {
        prevItem && document.getElementById(prevItem).style.setProperty("visibility", "hidden")
        return `upper${index}`
      })
     }
      else if(percentageFromBottom < 50) {
      document.getElementById(`lower${index}`).style.setProperty("visibility", "visible") 
      setPrevIndicator(prevItem => {
        prevItem && document.getElementById(prevItem).style.setProperty("visibility", "hidden")
        return `lower${index}`
      })
      }
    }
    // let hrArray = [...document.getElementsByTagName("hr")]
    // hrArray.forEach((item,index) => {           //calculate
    //   if(index !== targetIndex)
    //     item.style.setProperty("visibility", "hidden")
    // })
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    console.log("drop")
    // 
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
    let hrArray = [...document.getElementsByClassName("indicator")]
    hrArray.forEach(item => {
      item.style.setProperty("visibility", "hidden")
    })
  };

  // const handleDragEnd = () => {
  //   console.log("end")
  //   document.getElementsByClassName("indicator").style.setProperty("visibility", "hidden")
  //   setDraggedIndex(null);
  //   setTargetIndex(null);
  //   setIsDragging(false);
    
  // }
//  console.log(dataComponents)
 
  return (
    <>
      {children.map((item, index) => (
        <div
          key={index}
          onDragStart={(e) => handleDragStart(e, item.key, index)}
          // onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(e, item.key, index)}
          onDrop={(e) => handleDrop(e, item.key, index)}
        >
          {item}
        </div>
      ))}  
    </>
  )
}

export default MakeSortableNew