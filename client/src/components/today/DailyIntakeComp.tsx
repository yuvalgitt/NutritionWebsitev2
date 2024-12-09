import React, { useEffect, useState } from 'react'
import { Food } from '../../types/types'

interface Props {
    intakeArray : [Food, Number][]
}

const DailyIntakeComp = ({intakeArray} : Props) => {
  const [totalCalories, setTotalCalories] = useState<number>(0)
  useEffect(()=>{
    let sum = 0;
    for(let i = 0; i < intakeArray.length ; i++){
      sum+= intakeArray[i].calories
    }
    setTotalCalories(sum)
  },[intakeArray])


  return (
    <div className='display-component' style={{
      display : 'flex',
      flexDirection : 'column',
      width : "400px",
      marginLeft : '50px'
    }}>
      Total : {totalCalories}
      {intakeArray.map((x : Food) =>{
        return <span key={x._id}>{x.name} : {x.calories}</span>
      })}
    </div>
  )
}

export default DailyIntakeComp