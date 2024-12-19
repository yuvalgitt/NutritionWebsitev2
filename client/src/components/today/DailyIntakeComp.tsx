import React, { useEffect, useState } from "react";
import { Food } from "../../types/types";

interface Props {
  intakeArray: [Food, number][];
}

const DailyIntakeComp = ({ intakeArray }: Props) => {
  const [totalCalories, setTotalCalories] = useState<number>(0);
  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < intakeArray.length; i++) {
      sum += (intakeArray[i][1] * intakeArray[i][0].calories) / 100;
    }
    setTotalCalories(sum);
  }, [intakeArray]);

  return (
    <div
      className="display-component"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        marginLeft: "50px",
      }}
    >
      <span style={{ fontSize: "35px" }}>
        {" "}
        Total <span style={{ color: "lightgoldenrodyellow" }}>
          calories
        </span>:{" "}
        <span style={{ color: "lightcoral" }}>{Math.floor(totalCalories)}</span>{" "}
      </span>

      {intakeArray.map((x: [Food, number], index) => {
        return (
          <span key={index}>
            {" "}
            {x[1]} grams of {x[0].name}{" "}
            <span style={{ color: "lightgoldenrodyellow" }}>
              {(x[1] * x[0].calories) / 100} calories
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default DailyIntakeComp;
