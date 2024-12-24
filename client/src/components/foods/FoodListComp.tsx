//This comp will GET from server all foods and display them
import axios from "axios";
import React, { useEffect } from "react";
import serverUrl from "../../config/config";
import { useState } from "react";
import FoodItemComp from "./SubFoodList/FoodItemComp";
import { Food } from "../../types/types";
import "../../styles/styles.css";

interface Props {
  setFood: React.Dispatch<React.SetStateAction<Food | undefined>>;
  isAdmin: boolean;
}

const FoodListComp = ({ setFood, isAdmin }: Props) => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [modifier, setModifier] = useState<number>(1);
  const [refresh, setRefresh] = useState<number>();

  useEffect(() => {
    setFood(foodData[0]);
  }, [foodData]);

  const [searchedFor, setSearchedFor] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      let response;
      if (searchedFor === "") {
        response = await axios.get(`${serverUrl}/foods/`);
        setFoodData(response.data);
      } else {
        response = await axios.get(`${serverUrl}/foods/name/${searchedFor}`);
        setFoodData(response.data);
      }
    };
    fetch();
  }, [searchedFor]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedFor(e.target.value);
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${serverUrl}/foods`);
      const data = response.data;
      setFoodData(data);
      console.log(data);
    };
    fetch();
  }, [refresh]);

  const handleModifier = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value : number | string = e.target.value
    if (+value < 100000)
       setModifier(+value / 100);
      else {
        value = "10000"
      }
  };
  return (
    <div
      className="display-component"
      style={{
        width: "70%",
        marginTop: "-20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "20px" }}>Food Statistics</span>{" "}
        <span>
          Search{" "}
          <input
            style={{ width: "100%" }}
            placeholder="Food name"
            onChange={handleSearch}
            className="input-bar"
            type="text"
          />
        </span>
      </div>
      <span>
        Per{" "}
        <input
          style={{ width: "90px" }}
          defaultValue={100}
          onChange={handleModifier}
          type="number"
        />{" "}
        grams
      </span>
      <div style={{ overflow: "auto", height: "80%" }}>
        {foodData?.map((x: Food) => {
          return (
            <FoodItemComp
              isAdmin={isAdmin}
              setRefresh={setRefresh}
              modifier={modifier}
              setFood={setFood}
              foodObj={x}
              key={x._id}
            ></FoodItemComp>
          );
        })}
      </div>
    </div>
  );
};
export default FoodListComp;
