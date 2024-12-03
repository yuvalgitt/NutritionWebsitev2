import React, { useEffect, useState } from "react";
import { Food } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";
import FoodItemComp from "../foods/SubFoodList/FoodItemComp";

const EatenToday = () => {
  const [foodArr, setFoodArr] = useState<Food[]>();
  const [searchedFor, setSearchedFor] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      let response;
      if (searchedFor === "") response = await axios.get(`${serverUrl}/foods/`);
      else response = await axios.get(`${serverUrl}/foods/name/${searchedFor}`);

      setFoodArr(response.data.splice(0,12));
    };
    fetch();
  }, [searchedFor]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedFor(e.target.value);
  };

  return (
    <div
      style={{
        width: "700px",
        marginLeft: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="display-component"
    >
      <div>
        What have you eaten today? <br />
        Search : <input onChange={handleSearch} type="text" />
        <br />
        <br />
        <div style={{
            display : 'flex',
            flexDirection : 'column',
        }}>
          {foodArr?.map((x: Food) => {
            return <FoodItemComp foodObj={x} key={x._id}></FoodItemComp>;
          })}
        </div>
      </div>
      <br />
    </div>
  );
};

export default EatenToday;
