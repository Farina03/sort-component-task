//const [isDragging, setIsDragging] = useState(false)
const [direction, setDirection] = useState(0)
const [prevPosition, setPrevPosition] = useState(-1)
const [dragStart, setDragStart] = useState(false)
const [draggingItem, setDraggingItem] = useState(-1)
// const [draggingItem, setDraggingItem] = useState(null)

function handleDragStart(e, item, index) {
    // setDraggingItem(item)
    setDraggingItem(index)
    setDragStart(true)
    
  }
  function handleDragEnd() {
    setDraggingItem(null)
    setIsDragging(false)
    setPrevPosition(0)
    setDirection(0)
    // for(let i = 0; i <= dataComponents.length; i++) {
    //   console.log(i)
    //   document.getElementById(i).style.setProperty("visibility", "hidden")
    // }
  }
  function handleDragOver(e, item, index) {
    //e.preventDefault()
    
    if(index === draggingItem && dragStart) { 
      // document.getElementById(index).style.setProperty("visibility", "hidden")
      // document.getElementById(index+1).style.setProperty("visibility", "hidden")
    }
    if(index < prevPosition) {
      setDragStart(false)
      // document.getElementById(index).style.setProperty("visibility", "visible")
      setDirection(0)
    }
    else if(index > prevPosition) {
      setDragStart(false)
      // document.getElementById(index+1).style.setProperty("visibility", "visible")
      setDirection(1)
    }
    e.preventDefault()
  }
  function handleDragLeave(index) {
    setPrevPosition(index)
    // console.log(index, direction)
    // document.getElementById(index+direction).style.setProperty("visibility", "hidden")
  }
  function handleDrop(e, targetItem, index) {
    if(draggingItem === -1) return
    //const currentIndex = dataComponents.indexOf(draggingItem)
    const currentIndex = draggingItem
    const targetIndex = index
    //const targetIndex = dataComponents.indexOf(targetItem)
    if(currentIndex !== -1 && targetIndex !== -1) {
      let currentItem = dataComponents[currentIndex]
      dataComponents.splice(currentIndex, 1)
      dataComponents.splice(targetIndex, 0, currentItem)
    //   dataComponents.splice(targetIndex, 0, draggingItem)
      setDataComponents(dataComponents)
    }
    // for(let i = 0; i <= dataComponents.length; i++) {
    //   document.getElementById(i).style.setProperty("visibility", "hidden")
    // }
    setDraggingItem(-1)
    setIsDragging(false)
    setPrevPosition(-1)
    setDirection(0)
  }