import React, { useState } from "react";
import { Food } from "../../../types/types";

interface Props {
  setIntakeArray: React.Dispatch<React.SetStateAction<[Food, number][]>>;
  intakeArray: [Food, number][];
  foodObj: Food;
  setPressedAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFoodComp = ({
  setIntakeArray,
  intakeArray,
  foodObj,
  setPressedAdd,
}: Props) => {
  const [grams, setGrams] = useState<number>(100);

  const handleAddOne = () => {
    if(foodObj.portionSize)
      setIntakeArray([...intakeArray, [foodObj, foodObj.portionSize]]);
    else
      alert('missing portion size')
      
    setPressedAdd(false);
  };

  const handleAddInput = () => {
    setPressedAdd(false);
    setIntakeArray([...intakeArray, [foodObj, grams]]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrams(+e.target.value);
  };

  const handleClose = () => {
    setPressedAdd(false)
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1",
        marginLeft: "30%",
      }}
      className="display-component"
    >
      <span
        style={{
          zIndex: 2,
          position: "absolute",
          cursor : "pointer" ,
          marginLeft: "88%",
          marginTop: "-7%"
        }}
        onClick={handleClose}
      >
        <h3>X</h3>
      </span>
      Specify Amount <br /> <br />
      <input
        style={{width : '20%'}}
        type="number"
        onChange={handleChange}
        defaultValue={grams}
      /> grams <button onClick={handleAddInput}>add</button>
      {foodObj.portionSize && <span> | <button onClick={handleAddOne}> One </button> {foodObj.portionSize} grams</span> }
    </div>
  );
};

export default AddFoodComp;
