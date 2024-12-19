import axios from "axios";
import React from "react";
import { useState } from "react";
import serverUrl from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { Food } from "../../../types/types";

interface Props {
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
}

const AddFood = ({ setImgUrl }: Props) => {

  const navigate = useNavigate()
  const [foodObj, setFoodObj] = useState<Food>({
    'name': '',
    calories: 0,
    carbohydrates: 0,
    fats: 0,
    proteins: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name;

    if (type === "imgUrl") setImgUrl(e.target.value);

    if (!(type === "imgUrl" || type === "name"))
      setFoodObj({ ...foodObj, [type]: +e.target.value });
    else setFoodObj({ ...foodObj, [type]: e.target.value });
  };

  const handleSearch = () => {
    const query = `${foodObj?.name}+nutrition+facts`
    const url = `https://www.google.com/search?q=${query}`
    window.open(url,'_blank')
  }

  const handlePortionSearch = () => {
    const query = `${foodObj?.name}+portion+size+in+grams`
    const url = `https://www.google.com/search?q=${query}`
    window.open(url,'_blank')
  }

  const handleSubmit = async () => {
    try {

      const response = await axios.post(`${serverUrl}/foods`, foodObj);
      alert('Added successfuly')
      navigate('/')
    }
    catch {
      alert('error')
    }
  };

  return (
    <div
      style={{
        width: "50%",
      }}
      className="display-component"
    >
      <h1>Add food details</h1>
      <span>Name : </span>
      <input onChange={handleChange} name="name" type="text" /> <button onClick={handleSearch} >search for</button><br />
      <span>Kcal per 100g : </span>
      <input onChange={handleChange} name="calories" type="number" /> <br />
      <span>proteins per 100g : </span>{" "}
      <input onChange={handleChange} name="proteins" type="number" /> <br />
      <span>carbohydrates per 100g : </span>{" "}
      <input onChange={handleChange} name="carbohydrates" type="number" />{" "}
      <br />
      <span>fats per 100g : </span>{" "}
      <input onChange={handleChange} name="fats" type="number" /> <br />
      <span>portion size</span>
      <input type="number" /> <button onClick={handlePortionSearch} >Search for</button> <br />
      Add image url :{" "}
      <input
        onChange={handleChange}
        name="imgUrl"
        style={{ width: "100%" }}
        type="text"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddFood;
