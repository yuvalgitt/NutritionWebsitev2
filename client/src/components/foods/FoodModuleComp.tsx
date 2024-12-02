import React, { useState } from "react";
import FoodListComp from "./FoodListComp";
import FoodGraphicComp from "./FoodGraphicComp";
import "../../styles/styles.css";
import { Food } from "../../types/types";

const FoodModuleComp = () => {

  const [selectedItem, setSelectedItem] = useState<Food>()

  return (
    <div className="module-invisible">
      <FoodListComp setFood={setSelectedItem} ></FoodListComp>
      <FoodGraphicComp displayFood={selectedItem} ></FoodGraphicComp>
    </div>
  );
};

export default FoodModuleComp;
