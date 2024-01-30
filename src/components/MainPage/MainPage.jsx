import React, { useEffect, useState } from 'react'
import { data } from '../../data'
import './mainpage.css'
import '../MakeSortable/makesortable.css'
import MakeSortable from '../MakeSortable/MakeSortable'
import SingleComponent from '../SingleComponent/SingleComponent'
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
        <MakeSortableNew dataComponents={dataComponents}
                        setDataComponents={setDataComponents}>
          {
            dataComponents.map((item,index) => {
              return (
                  // <div key={item.id}>
                    <div key={item.id} className='single-div-class' 
                        style={{backgroundColor:item.color}}
                        draggable={isDragging ? 'true' : 'false'}>
                    <hr className="indicator" id={`upper${index}`}/>
                    <div id={`dragbox${item.id}`}className='drag-div' 
                         onMouseDown={()=>setIsDragging(true)}
                         onMouseUp={()=>setIsDragging(false)}>
                    </div>
                    <hr className="indicator" id={`lower${index}`}/>
                    {item.text}
                    </div>
                  // </div>
                )
            })
          }
        </MakeSortableNew>
    </div>
  )
}

export default MainPage