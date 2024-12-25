import React from 'react'
import "../../styles/styles.css"
import { Intake } from '../../types/types'

interface Props {
  intakeArray : Intake[]
}

const MonthlyStatsComp = ({intakeArray}:Props) => {


  return (
    <div  style={{
        marginTop :'2%',
        height : '35.5%'
    }} className='display-component'
    >MonthlyStatsComp</div>
  )
}

export default MonthlyStatsComp