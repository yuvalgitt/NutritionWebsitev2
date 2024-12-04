import React from 'react'
import EatenToday from './EatenToday'
import DailyIntakeComp from './DailyIntakeComp'
import { Food } from '../../types/types'
import { useState } from 'react'

const TodayModuleComp = () => {

  const [intakeArr, setntakeArr] = useState<Food[]>([])
  
  return (
    <div className='module-invisible' style={{height : "100%"}}>
    <EatenToday></EatenToday>
    <DailyIntakeComp></DailyIntakeComp>
    </div>
  )
}

export default TodayModuleComp