import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import { Food, Intake } from "../../types/types";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import serverUrl from "../../config/config";

interface Props {
  intakeArray: Intake[];
  refresh: React.Dispatch<React.SetStateAction<number>>;
}

const DailyStatsComp = ({ intakeArray, refresh }: Props) => {
  const [dailyGraphData, setDailyGraphData] =
    useState<{ time: string; content: object }[]>();

  const extractData = async () => {
    let extractedData = [];
    for (let i = 0; i < intakeArray.length; i++) {
      const x = intakeArray[i];
      const food: Food = await (await axios.get(`${serverUrl}/foods/${x.foodForeignKey}`)).data;

      extractedData[i] = {
        time: `${x.date.hour}:${x.date.minute}`,
        content: {
          calories: (x.amountInGrams * food.calories / 100),
          name: food.name,
        },
      };
    }

    setDailyGraphData(extractedData);
  };

  useEffect(() => {
    refresh(new Date().getTime());
    console.log('intake',intakeArray);
    
    extractData();
  }, []);

  useEffect(() => {
    extractData();
  }, [intakeArray]);

  const customToolTip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div>
          <span style={{ color: "lightblue", fontSize: "25px" }}>
            {" "}
            @{label} consumed :{" "}
            <span style={{ color: "lightgreen", fontSize: "25px" }}>
              {Math.floor(payload[0].value)}{" "}
            </span>{" "}
            calories of {payload[0]?.payload.content.name}
          </span>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        height: "55%",
        width: "97%",
        marginTop: "-1.25%",
      }}
      className="display-component"
    > <h1 style={{zIndex : '4' , position : 'absolute', opacity : '0.6'}} >daily</h1>
      <ResponsiveContainer>
        <LineChart data={dailyGraphData}>
          <XAxis stroke="lightgreen" dataKey="time"></XAxis>
          <YAxis stroke="lightgreen" dataKey="content.calories"></YAxis>
          <CartesianGrid strokeDasharray={"3 10"}></CartesianGrid>
          <Tooltip content={customToolTip}></Tooltip>
          <Line   fill="lightblue" dataKey="content.calories" type={"monotone"}></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyStatsComp;
