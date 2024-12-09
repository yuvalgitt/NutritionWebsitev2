import React, { useEffect, useState } from "react";
import { Food } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";
import EatenItemComp from "./EatenToday/EatenItemComp";

interface Props {
  setIntakeArray : React.Dispatch<React.SetStateAction<[Food, number][]>>
  intakeArray : [Food, number][]
}

const EatenToday = ({setIntakeArray, intakeArray} : Props) => {
  const [foodArr, setFoodArr] = useState<Food[]>();
  const [searchedFor, setSearchedFor] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      let response;
      if (searchedFor === "") response = await axios.get(`${serverUrl}/foods/`);
      else response = await axios.get(`${serverUrl}/foods/name/${searchedFor}`);

      setFoodArr(response.data.splice(0, 12));
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
      }}
      className="display-component"
    >
      <center><h1>Add the foods you have eaten today : <br /></h1>
      </center>
      Search : <input onChange={handleSearch} type="text" /> <br />
      {foodArr?.map((x: Food) => {
        return <EatenItemComp intakeArray={intakeArray} setIntakeArray={setIntakeArray} foodObj={x} key={x._id}></EatenItemComp>;
      })}
    </div>
  );
};

export default EatenToday;
