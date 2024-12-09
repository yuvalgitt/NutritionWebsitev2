import React, { useEffect } from 'react'
import EatenToday from './EatenToday'
import DailyIntakeComp from './DailyIntakeComp'
import { Food } from '../../types/types'
import { useState } from 'react'
import AddFoodComp from './EatenToday/AddFoodComp'

const TodayModuleComp = () => {

  const [intakeArray, setintakeArray] = useState<Array<[Food,number]>>([])

  useEffect( () => {
    console.log(intakeArray,"intakearray");
  } ,[intakeArray])
  
  return (
    <div className='module-invisible' style={{height : "100%"}}>
    <EatenToday intakeArray={intakeArray} setIntakeArray={setintakeArray} ></EatenToday>
    <DailyIntakeComp intakeArray={intakeArray} ></DailyIntakeComp>
    </div>
  )
}

export default TodayModuleComp