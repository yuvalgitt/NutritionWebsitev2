//This comp will GET from server all foods and display them
import axios from "axios";
import React, { useEffect } from "react";
import serverUrl from "../../config/config";
import { useState } from "react";
import FoodItemComp from "./SubFoodList/FoodItemComp";
import { Food } from "../../types/types";
import "../../styles/styles.css"

interface Props{
  setFood : React.Dispatch<React.SetStateAction<Food | undefined>>
}

const FoodListComp = ({setFood}:Props) => {
  const [foodData, setFoodData] = useState<Food[]>([]);
  const [modifier, setModifier] = useState<number>(1)
  const [refresh, setRefresh] = useState<number>()

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${serverUrl}/foods`);
      const data = response.data;
      setFoodData(data.splice(0,13));
      console.log(data);
    };
    fetch();
  }, [refresh]);

  const handleModifier = (e : React.ChangeEvent<HTMLInputElement>) => {
      setModifier(+e.target.value/100)
  }
  return (
    <div className="display-component"
      style={{
        width: "70%",
        height: "100%",
        marginTop : '-20px'
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
          Search <input placeholder="Food name" className="input-bar" type="text" />
        </span>
      </div>
        <div style={{display:'flex',justifyContent :'space-between', marginRight : '150px'}}>
          <span >Name</span>
          <span style={{color : "lightcoral"}} >Kcal</span>
          <span style={{color : "wheat"}} >Proteins</span>
          <span style={{color : "lightblue"}} >Carbohydrates</span>
          <span style={{color : "lightgreen"}} >Fats</span>
        </div>
        
        <span>Per <input style={{width :'40px'}} defaultValue={100} onChange={handleModifier} type="number" /> grams</span>
          <div>
            {foodData?.map((x: Food) => {
              return <FoodItemComp setRefresh={setRefresh} modifier={modifier} setFood={setFood} foodObj={x} key={x._id}></FoodItemComp>
            })}
          </div>
    </div>
  );
};
export default FoodListComp;
