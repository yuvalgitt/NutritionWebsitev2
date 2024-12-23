import React from "react";
import FoodImageComp from "./SubFoodGraphic/FoodImageComp";
import FoodGraphComp from "./SubFoodGraphic/FoodGraphComp";
import { Food } from "../../types/types";

interface Props{
  displayFood : Food | undefined
}


const FoodGraphicComp = ({displayFood} :Props) => {
  return (
    <div
      style={{
        width: "40%",
        borderRadius: "16px",
        marginLeft: "20px",
        display: 'flex',
        flexDirection : 'column',
        alignItems : 'center',
      }}
    >
      <FoodImageComp displayFood={displayFood} ></FoodImageComp>
      <FoodGraphComp foodObj={displayFood}></FoodGraphComp>
    </div>
  );
};

export default FoodGraphicComp;
