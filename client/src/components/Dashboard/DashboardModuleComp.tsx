import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import DailyStatsComp from "./DailyStatsComp";
import MonthlyStatsComp from "./MonthlyStatsComp";
import "../../styles/styles.css";
import { Intake, User } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";

interface Props {
  currentUser : User | undefined
}

const DashboardModuleComp = ({currentUser}:Props) => {
  const [monthlyIntakes, setMonthlyIntakes] = useState<Intake[]>([])
  const [dailyIntakes, setDailyIntakes] = useState<Intake[]>([])
  const [refresh, setRefresh] = useState<number>(0)

  useEffect(()=>{
    const fetchIntakes = async() => {
      const date = new Date()
      if(currentUser) {
        let response = await axios.get(`${serverUrl}/intake/${currentUser._id}/${date.getFullYear()}/${date.getMonth()}`)
        response = response.data
        
        if(Array.isArray(response))
          setMonthlyIntakes(response)
        else {
          console.log('invalid response , not array');
        }
        response = await axios.get(`${serverUrl}/intake/${currentUser._id}/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`)
        response = response.data
        
        if(Array.isArray(response))
          setDailyIntakes(response)
        
        else {
          console.log('invalid response , not array');
        }
      }
    }
    fetchIntakes()
  },[, refresh])

  return (
    <div
      className="module-invisible"
      style={{
        flexDirection: "column",
        height :'97.3%'
      }}
    >
      <DailyStatsComp refresh={setRefresh} intakeArray={dailyIntakes} ></DailyStatsComp>
      <MonthlyStatsComp intakeArray={monthlyIntakes} ></MonthlyStatsComp>
    </div>
  );
};

export default DashboardModuleComp;
