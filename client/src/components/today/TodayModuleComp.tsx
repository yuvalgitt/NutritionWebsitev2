import React, { useEffect } from 'react'
import EatenToday from './EatenToday'
import DailyIntakeComp from './DailyIntakeComp'
import { Food, Intake, User } from '../../types/types'
import { useState } from 'react'
import AddFoodComp from './EatenToday/AddFoodComp'

interface Props {
  currentUser : User | undefined;
}

const TodayModuleComp = ({currentUser}:Props) => {

  const [intakeArray, setintakeArray] = useState<Array<Intake>>([])
  useEffect(()=>{
    console.log('intakeArray',intakeArray);
    
  },[intakeArray])
  
  return (
    <div className='module-invisible' style={{height : "100%"}}>
    <EatenToday currentUser={currentUser} intakeArray={intakeArray} setIntakeArray={setintakeArray} ></EatenToday>
    <DailyIntakeComp currentUser={currentUser} intakeArray={intakeArray} ></DailyIntakeComp>
    </div>
  )
}

export default TodayModuleComp