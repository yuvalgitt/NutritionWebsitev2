import React from 'react'
import EatenToday from './EatenToday'
import DailyIntakeComp from './DailyIntakeComp'

const TodayModuleComp = () => {
  return (
    <div className='module-invisible'>
    <EatenToday></EatenToday>
    <DailyIntakeComp></DailyIntakeComp>
    </div>
  )
}

export default TodayModuleComp