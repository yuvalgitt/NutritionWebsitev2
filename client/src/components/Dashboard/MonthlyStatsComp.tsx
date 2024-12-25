import React, { useEffect, useState } from 'react'
import "../../styles/styles.css"
import { Food, Intake } from '../../types/types'
import axios from 'axios'
import serverUrl from '../../config/config'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface Props {
  intakeArray : Intake[]
}

const MonthlyStatsComp = ({intakeArray}:Props) => {
  const [monthlyGraphData, setMonthlyGraphData] = useState<{dayOfMonth : number, calories : number}[]>([])

  

  const extractDataFunction = async()=>{
    let extractedData: any = []
    let map = new Map<number,number>()
    for(let i = 0 ; i< intakeArray.length ; i++){
      const x : Intake = intakeArray[i];
      const food : Food = await (await axios.get(`${serverUrl}/foods/${x.foodForeignKey}`)).data

      let temp : number | undefined = 0
      if(map.get(x.date.day))
        temp = map.get(x.date.day)

      map.set(x.date.day,x.amountInGrams*food.calories/100 + (temp? temp : 0))
    }
    map.forEach((value,key)=>{
      extractedData.push({
        dayOfMonth :key,
        calories :value
      })
    })

    extractedData.sort((a, b) => a.dayOfMonth - b.dayOfMonth)
    
    setMonthlyGraphData(extractedData)
  }

  useEffect(()=>{
    extractDataFunction()
  },[intakeArray])


  const customToolTip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div >
          <span style={{fontSize : '30px',color : 'lightblue'}}> @{payload[0].payload.dayOfMonth} <span style={{  fontSize : '30px',color : 'lightgreen'}}> {payload[0].value}</span> calories</span>
        </div>
      );
    }
  };

  return (
    <div  style={{
        marginTop :'2%',
        height : '35.5%'
    }} className='display-component'
    >
      <ResponsiveContainer>
        <BarChart data={monthlyGraphData}  >
          <Legend></Legend>
          <XAxis stroke='lightgreen' dataKey={'dayOfMonth'}></XAxis>
          <YAxis  stroke='lightgreen' ></YAxis>
          <Tooltip cursor={false}  content={customToolTip}></Tooltip>
          <CartesianGrid strokeDasharray={'2 5'}></CartesianGrid>
          <Bar  fill='rgb(255, 105, 55)' dataKey={'calories'}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyStatsComp