import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import DailyStatsComp from "./DailyStatsComp";
import MonthlyStatsComp from "./MonthlyStatsComp";
import "../../styles/styles.css";
import { Intake, User } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";

interface Props {
  currentUser : User
}

const DashboardModuleComp = ({currentUser}:Props) => {
  const [allUserIntakes, setAllUserIntakes] = useState<Intake[]>([])
  const [MonthlyIntakes, setMonthlyIntakes] = useState<Intake[]>([])
  const [DailyIntakes, setDailyIntakes] = useState<Intake[]>([])

  useEffect(()=>{
    const fetchIntakes = async() => {
      let response = await axios.get(`${serverUrl}/intake/${currentUser._id}`)
      response = response.data
      if(Array.isArray(response))
        setAllUserIntakes(response)
      else {
        console.log('invalid response , not array');
        
      }
    }
    fetchIntakes()
  },[])

  return (
    <div
      className="module-invisible"
      style={{
        flexDirection: "column",
        height :'97.3%'
      }}
    >
      <DailyStatsComp></DailyStatsComp>
      <MonthlyStatsComp></MonthlyStatsComp>
    </div>
  );
};

export default DashboardModuleComp;
