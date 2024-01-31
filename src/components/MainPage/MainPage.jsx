import React, { useEffect, useState } from 'react'
import { data } from '../../data'
import './mainpage.css'
import '../MakeSortable/makesortable.css'
// import MakeSortable from '../MakeSortable/MakeSortable'
// import SingleComponent from '../SingleComponent/SingleComponent'
import MakeSortableNew from '../MakeSortableNew/MakeSortableNew'

const MainPage = () => {
  const [dataComponents, setDataComponents] = useState(data)
  const [isDragging, setIsDragging] = useState(false)

  const highlighterStyle = {
    backgroundColor: "#81689D",
    height: "4px",
    border: "none",
    visibility: "visible"
  }
  
  return (
    <div className='mainpage'>
        Sort the items!
        <div style={{maxWidth:"600px"}}>
        <MakeSortableNew dataComponents={dataComponents}
                        setDataComponents={setDataComponents}>
          {
            dataComponents.map((item,index) => {
              return (
                  <div key={item.id}>
                    <div key={item.id} id={`div${index}`} className='single-div-class' 
                        style={{backgroundColor:item.color}}
                        draggable={isDragging ? 'true' : 'false'}>
                    <hr className="indicator upper" id={`upper${index}`}/>
                    <div className='drag-div' 
                         onMouseDown={()=>setIsDragging(true)}
                         onMouseUp={()=>setIsDragging(false)}>
                    </div>
                    <hr className="indicator lower" id={`lower${index}`}/>
                    {item.text}
                    </div>
                   </div>
                )
            })
          }
        </MakeSortableNew>
        </div>
    </div>
  )
}

export default MainPage