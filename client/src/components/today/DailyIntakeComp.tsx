import React, { useEffect, useState } from "react";
import { Food, Intake, User, DateObj } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";

interface Props {
  intakeArray: Intake[];
  currentUser: User | undefined;
  time: DateObj;
}

const DailyIntakeComp = ({ intakeArray, currentUser, time }: Props) => {
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [displayIntakeArray, setDisplayIntakeArray] = useState<
    Array<[Food, number, string, DateObj]>
  >([]);
  const [refresh, setRefresh] = useState<number>();

  const handleRemove = async (id: string) => {
    try {
      let response = await axios.delete(`${serverUrl}/intake/${id}`);
      console.log(response.data);
      const date = new Date();
      setRefresh(date.getTime());
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      let response, data;
      let foodArray: [Food, number, string, DateObj][] = [];
      if (currentUser) {
        response = await axios.get(`${serverUrl}/intake/${currentUser._id}`);
        let sum = 0;
        data = response.data;
        for (let i = 0; i < data.length; i++) {
          let time: DateObj = data[i].date;
          let foodId = data[i].foodForeignKey;
          let foodResponse = await axios.get(`${serverUrl}/foods/${foodId}`);
          let food: Food = foodResponse.data;
          sum += (food.calories * data[i].amountInGrams) / 100;
          foodArray = [
            ...foodArray,
            [food, data[i].amountInGrams, data[i]._id, time],
          ];
        }
        setDisplayIntakeArray(foodArray);
        setTotalCalories(sum);
      }
    };
    fetch();
    setRefresh(new Date().getTime());
  }, [,intakeArray, refresh]);

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
        Total{" "}
        <span style={{ color: "lightgoldenrodyellow", fontSize: "35px" }}>
          calories
        </span>
        :{" "}
        <span style={{ color: "lightcoral", fontSize: "35px" }}>
          {Math.floor(totalCalories)}
        </span>{" "}
      </span>
      {displayIntakeArray?.map((x: [Food, number, string, DateObj], index) => {
        return (
          <span key={index}>
            at {x[3].hour}:{x[3].minute} |
            {x[1]} grams of {x[0].name} {""}
            <span style={{ color: "lightgoldenrodyellow" }}>
              {(x[0].calories * x[1]) / 100} calories
            </span>
            <button
              onClick={() => handleRemove(x[2])}
              style={{ fontSize: "10px" }}
            >
              x
            </button>
          </span>
        );
      })}
    </div>
  );
};

export default DailyIntakeComp;
