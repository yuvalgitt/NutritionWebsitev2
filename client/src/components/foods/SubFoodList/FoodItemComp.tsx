import React, { useState } from "react";
import { Food } from "../../../types/types";
import axios from "axios";
import serverUrl from "../../../config/config";

interface Props {
  foodObj: Food;
  setFood?: React.Dispatch<React.SetStateAction<Food | undefined>>;
  modifier?: number;
  setRefresh?: React.Dispatch<React.SetStateAction<number | undefined>>;
  isAdmin : boolean;
}

const FoodItemComp = ({ foodObj, setFood, modifier, setRefresh, isAdmin }: Props) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false)
  const [editObj, setEditObj] = useState<Food>(foodObj)

  if (!modifier) modifier = 1

  const handleSelect = () => {
    if (setFood)
      setFood(foodObj);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const type = e.target.name;

    if (type === 'name' || type === 'imgUrl') {
      setEditObj({ ...editObj, [type]: e.target.value });
      return
    }
    setEditObj({ ...editObj, [type]: +e.target.value });
  }

  const handlePortionSearch = () => {
    const query = `${foodObj?.name}+portion+size+in+grams`
    const url = `https://www.google.com/search?q=${query}`
    window.open(url,'_blank')
  }

  const handleSave = async () => {
    try {
      console.log('editObj',editObj);
      
      const response = await axios.patch(`${serverUrl}/foods/${editObj._id}`, editObj)
      setIsEdit(false)

      const date = new Date()

      if (setRefresh)
        setRefresh(date.getTime())
      
    }
    catch (error) {
      alert(error)
    }

  }

  return (
    <div style={{ width: "100%" }}>
      {!isEdit && <div
        style={{
          width: "95%",
          borderBottom: "solid 1px black",
          marginBottom: "8px",
          marginLeft: "25px",
          display: "flex",
          justifyContent : "space-evenly"
        }}
        className="food-item"
        onClick={handleSelect}>
        <span className="food-detail">{foodObj.name}</span>
        <span style={{ color: "lightcoral" }} className="food-detail">
          {" "}
          {Math.floor(modifier * foodObj.calories)} Kcal{" "}
        </span>
        <span style={{ color: "lightgoldenrodyellow" }} className="food-detail">
          {" "}
          {Math.floor(modifier * foodObj.proteins*10)/10} proteins
        </span>
        <span style={{ color: "lightskyblue" }} className="food-detail">
          {Math.floor(modifier * foodObj.carbohydrates)} carbohydrates
        </span>
        <span style={{ color: "lightgreen" }} className="food-detail">
          {" "}
          {Math.floor(modifier * foodObj.fats)} fats{" "}
        </span>
        {isAdmin && <button onClick={() => setIsEdit(true)} style={{ fontSize: "10px" }}>edit</button>}
      </div>}
      {/* If user toggles edit function */}
      {isEdit && <div
        style={{
          width: "95%",
          borderBottom: "solid 1px black",
          marginBottom: "8px",
          marginLeft: "25px",
          display: "flex",
        }}
        className="food-item"
        onClick={handleSelect} >
        <span className="food-detail">
          name <input className="input-edit" type="text" name="name" defaultValue={foodObj.name} onChange={handleChange} />
        </span>
        <span style={{ color: "lightcoral" }} className="food-detail">
          calories <input className="input-edit" type="number" name="calories" defaultValue={Math.floor(modifier * foodObj.calories)} onChange={handleChange} />
        </span>
        <span style={{ color: "lightgoldenrodyellow" }} className="food-detail">
          proteins <input className="input-edit" type="number" name="proteins" defaultValue={Math.floor(modifier * foodObj.proteins)} onChange={handleChange} />
        </span>
        <span style={{ color: "lightskyblue" }} className="food-detail">
          carbohydrates <input className="input-edit" type="number" name="carbohydrates" defaultValue={Math.floor(modifier * foodObj.carbohydrates)} onChange={handleChange} />
        </span>
        <span style={{ color: "lightgreen" }} className="food-detail">
          fats <input className="input-edit" type="number" name="fats" defaultValue={Math.floor(modifier * foodObj.fats)} onChange={handleChange} />
        </span>
        <span style={{ color: 'lightpink' }}>
          img url <input className="input-edit" type="text" name="imgUrl" defaultValue={foodObj.imgUrl} onChange={handleChange} />
        </span>
        <span>
          <button style={{fontSize : "10px"}} defaultValue={foodObj.portionSize} onClick={handlePortionSearch} >Search</button>
          Portion Size : <input onChange={handleChange} name="portionSize" defaultValue={foodObj.portionSize} type="number" />
        </span>
        <button onClick={handleSave} style={{ fontSize: "10px" }}>Save</button>
      </div>}
    </div>
  );
};

export default FoodItemComp;
