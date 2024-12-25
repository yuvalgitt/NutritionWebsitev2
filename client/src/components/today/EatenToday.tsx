import React, { useEffect, useState } from "react";
import { Food, Intake, User } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";
import EatenItemComp from "./EatenToday/SelectEatenItemComp";

interface Props {
  setIntakeArray: React.Dispatch<React.SetStateAction<Intake[]>>;
  intakeArray: Intake[];
  currentUser: User | undefined;
}

const EatenToday = ({ setIntakeArray, intakeArray, currentUser }: Props) => {
  const [foodArr, setFoodArr] = useState<Food[]>();
  const [searchedFor, setSearchedFor] = useState<string>("");

  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();

  useEffect(() => {
    const fetch = async () => {
      let response;
      if (searchedFor === "") response = await axios.get(`${serverUrl}/foods/`);
      else response = await axios.get(`${serverUrl}/foods/name/${searchedFor}`);

      setFoodArr(response.data);
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
      <center>
        <h3>
          {day}/{month+1}/{year}{" "}
        </h3>
        <h1>
          Add the foods you have eaten today : <br />
        </h1>
      </center>
      Search : <input onChange={handleSearch} type="text" /> <br />
      <div style={{overflow : 'auto' , height : '85%'}}>
        {foodArr?.map((x: Food) => {
          return (
            <EatenItemComp
              currentUser={currentUser}
              intakeArray={intakeArray}
              setIntakeArray={setIntakeArray}
              foodObj={x}
              key={x._id}
            ></EatenItemComp>
          );
        })}
      </div>
    </div>
  );
};

export default EatenToday;
