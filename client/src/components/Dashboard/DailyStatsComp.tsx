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
}

const DailyStatsComp = ({ intakeArray }: Props) => {
  const [dailyGraphData, setDailyGraphData] =
    useState<{ time: string; content: object }[]>();

  const extractData = async () => {
    let extractedData = [];
    for (let i = 0; i < intakeArray.length; i++) {
      const x = intakeArray[i];
      const food: Food = await (
        await axios.get(`${serverUrl}/foods/${x.foodForeignKey}`)
      ).data;

      extractedData[i] = {
        time: `${x.date.hour}:${x.date.minute}`,
        content: {
          calories: (x.amountInGrams * food.calories) / 100,
          name: food.name,
        },
      };
    }
    console.log("daily", dailyGraphData);

    setDailyGraphData(extractedData);
  };

  useEffect(() => {
    extractData();
  }, [, intakeArray]);

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
    >
      <ResponsiveContainer>
        <LineChart data={dailyGraphData}>
          <XAxis stroke="lightgreen" dataKey="time"></XAxis>
          <YAxis stroke="lightgreen" dataKey="content.calories"></YAxis>
          <Legend></Legend>
          <CartesianGrid strokeDasharray={"3 10"}></CartesianGrid>
          <Tooltip content={customToolTip}></Tooltip>
          <Line dataKey="content.calories" type={"monotone"}></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyStatsComp;
