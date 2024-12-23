import React, { useState } from "react";
import { Food, Intake, User } from "../../../types/types";
import axios from "axios";
import serverUrl from "../../../config/config";
import AddFoodComp from "./AddFoodComp";

interface Props {
  foodObj: Food;
  setFood?: React.Dispatch<React.SetStateAction<Food | undefined>>;
  setRefresh?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setIntakeArray : React.Dispatch<React.SetStateAction<Intake[]>>
  intakeArray : Intake[],
  currentUser : User | undefined;
}

const EatenItemComp = ({ foodObj, setRefresh , setIntakeArray , intakeArray , currentUser}: Props) => {
  const [addedFlag, setAddedFlag] = useState<boolean>(false)
  const [pressedAdd, setPressedAdd] = useState<boolean>(false)

  const handleAdd= () => {
      setPressedAdd(true)
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
        {foodObj.calories} Kcal{" "}
      </span>
      <span style={{ color: "lightgoldenrodyellow" }} className="food-detail">
        {" "}
        {foodObj.proteins} proteins
      </span>
      <span style={{ color: "lightskyblue" }} className="food-detail">
        {foodObj.carbohydrates} carbohydrates
      </span>
      <span style={{ color: "lightgreen" }} className="food-detail">
        {" "}
        {foodObj.fats} fats{" "}
      </span>
      {pressedAdd && <AddFoodComp currentUser={currentUser} setPressedAdd={setPressedAdd} foodObj={foodObj} intakeArray={intakeArray} setIntakeArray={setIntakeArray} ></AddFoodComp>}
      <button onClick={handleAdd} >+</button>
    </div>
  );
};

export default EatenItemComp;
