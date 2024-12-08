import React, { useState } from "react";
import { Food } from "../../../types/types";
import axios from "axios";
import serverUrl from "../../../config/config";

interface Props {
  foodObj: Food;
  setFood?: React.Dispatch<React.SetStateAction<Food | undefined>>;
  setRefresh?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setIntakeArray : React.Dispatch<React.SetStateAction<Food[]>>
  intakeArray : Food[]
}

const EatenItemComp = ({ foodObj, setRefresh , setIntakeArray , intakeArray}: Props) => {
  const [addedFlag, setAddedFlag] = useState<boolean>(false)

  const handleAdd= () => {
    if(!addedFlag){
      setIntakeArray([...intakeArray , foodObj])
      setAddedFlag(true)
    }
  }

  return (
    <div
      style={{
        width: "95%",
        borderBottom: "solid 1px black",
        marginBottom: "8px",
        marginLeft: "25px",
        display: "flex",
      }}
      className="food-item"
    >
      
      <span className="food-detail">{foodObj.name}</span>
      <span style={{ color: "lightcoral" }} className="food-detail">
        {" "}
        {Math.floor(foodObj.calories)} Kcal{" "}
      </span>
      <span style={{ color: "lightgoldenrodyellow" }} className="food-detail">
        {" "}
        {Math.floor(foodObj.proteins)} proteins
      </span>
      <span style={{ color: "lightskyblue" }} className="food-detail">
        {Math.floor(foodObj.carbohydrates)} carbohydrates
      </span>
      <span style={{ color: "lightgreen" }} className="food-detail">
        {" "}
        {Math.floor(foodObj.fats)} fats{" "}
      </span>
      <button onClick={handleAdd} >+</button>
    </div>
  );
};

export default EatenItemComp;
