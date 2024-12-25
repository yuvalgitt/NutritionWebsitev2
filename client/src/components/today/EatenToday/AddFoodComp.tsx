import React, { useEffect, useState } from "react";
import { Food, Intake, User } from "../../../types/types";
import axios from "axios";
import serverUrl from "../../../config/config";

interface Props {
  setIntakeArray: React.Dispatch<React.SetStateAction<Intake[]>>;
  intakeArray: Intake[];
  foodObj: Food;
  setPressedAdd: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  cursor: {
    x: number;
    y: number;
  };
}

const AddFoodComp = ({
  setIntakeArray,
  intakeArray,
  foodObj,
  currentUser,
  setPressedAdd,
  cursor,
}: Props) => {
  const [grams, setGrams] = useState<number>(100);
  const [coordinates, setCoordinates] = useState<{x : number, y: number}>({x : 0 , y :0})

  useEffect(()=>{
    console.log('cursor',cursor);
    setCoordinates(cursor)
  },[])

  const handleAddInput = async (addPortionSize: boolean) => {
    setPressedAdd(false);
    const date = new Date();

    if (foodObj._id && currentUser?._id) {
      const newIntakeObj = {
        foodForeignKey: foodObj._id,
        userForeignKey: currentUser._id,
        amountInGrams:
          addPortionSize && foodObj.portionSize ? foodObj.portionSize : grams,
        date: {
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDate(),
          hour: date.getHours(),
          minute: date.getMinutes(),
        },
      };
      setIntakeArray([...intakeArray, newIntakeObj]);
      try {
        await axios.post(`${serverUrl}/intake`, newIntakeObj);
      } catch (e) {
        alert(e);
      }
    } else {
      alert("must log in");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrams(+e.target.value);
  };

  const handleClose = () => {
    
    setPressedAdd(false);
  };

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "1",
        top: coordinates.y-20,
        left: coordinates.x/2 - 75,
        cursor: "default",
        marginLeft: "30%",
      }}
      className="display-component"
    >
      <span
        style={{
          zIndex: 2,
          position: "absolute",
          cursor: "pointer",
          marginLeft: "88%",
          marginTop: "-7%",
        }}
        onClick={handleClose}
      >
        <h3>X</h3>
      </span>
      Specify Amount of{" "}
      <span style={{ color: "lightblue" }}>{foodObj.name}</span> <br /> <br />
      <input
        style={{ width: "20%" }}
        type="number"
        onChange={handleChange}
        defaultValue={grams}
      />{" "}
      grams <button onClick={() => handleAddInput(false)}>add</button>
      {foodObj.portionSize && (
        <span>
          {" "}
          | <button onClick={() => handleAddInput(true)}> One </button>{" "}
          {foodObj.portionSize} grams
        </span>
      )}
    </div>
  );
};

export default AddFoodComp;
