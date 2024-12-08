import React, { useEffect } from 'react'
import EatenToday from './EatenToday'
import DailyIntakeComp from './DailyIntakeComp'
import { Food } from '../../types/types'
import { useState } from 'react'

const TodayModuleComp = () => {

  const [intakeArray, setintakeArray] = useState<Food[]>([])

  useEffect( () => {
    console.log("intakeArray",intakeArray);
  } ,[intakeArray])
  
  return (
    <div className='module-invisible' style={{height : "100%"}}>
    <EatenToday intakeArray={intakeArray} setIntakeArray={setintakeArray} ></EatenToday>
    <DailyIntakeComp intakeArray={intakeArray} ></DailyIntakeComp>
    </div>
  )
}

export default TodayModuleComp