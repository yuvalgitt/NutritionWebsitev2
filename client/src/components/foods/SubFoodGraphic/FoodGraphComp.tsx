import React, { act, useEffect, useState } from "react";
import "../../../styles/styles.css";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Food } from "../../../types/types";

interface Props {
  foodObj: Food | undefined;
}

const FoodGraphComp = ({ foodObj }: Props) => {
  const [dataArray, setDataArray] = useState<
    { name: string; value1: number }[]
  >([]);

  useEffect(() => {
    if (foodObj)
      setDataArray([
        {
          name: "Proteins",
          value1: foodObj.proteins,
        },
        {
          name: "Carbs",
          value1: foodObj.carbohydrates,
        },
        {
          name: "Fats",
          value1: foodObj.fats,
        },
      ]);
  }, [, foodObj]);

  const customToolTip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div>
          <span style={{ color: "lightblue", fontSize: "25px" }}>
            {" "}
            {label} per 100g :{" "}
            <span style={{ color: "lightgreen" , fontSize : '25px' }}>{payload[0].value}</span>{" "}
          </span>
        </div>
      );
    }
  };

  return (
    <div
      className="display-component"
      style={{
        width: "90%",
        height: "450px",
        marginTop: "20px",
      }}
    >
      <center>
        <h2 style={{ position: "absolute", zIndex: "1", color: "lightblue" }}>
          Macro Nutrients of{" "}
          <span style={{ color: "white" }}>{foodObj?.name}</span>
        </h2>
      </center>
      {foodObj && (
        <ResponsiveContainer
          height="100%"
          width="100%"
          style={{ marginTop: "45px" }}
        >
          <RadarChart data={dataArray}>
            <Tooltip content={customToolTip}></Tooltip>
            <PolarGrid></PolarGrid>
            <PolarAngleAxis dataKey="name"></PolarAngleAxis>
            <PolarRadiusAxis angle={75}></PolarRadiusAxis>
            <Radar
              fill="rgb(255, 187, 0)"
              fillOpacity="0.5"
              dataKey="value1"
            ></Radar>
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default FoodGraphComp;
