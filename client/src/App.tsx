import { FC, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HeaderComp from "./components/header/SideHeaderComp";
import FoodListComp from "./components/foods/FoodListComp";
import FoodModuleComp from "./components/foods/FoodModuleComp";
import { Routes, Route, useNavigate } from "react-router-dom";
import DashboardModuleComp from "./components/Dashboard/DashboardModuleComp";
import ProfileModuleComp from "./components/Profile/ProfileModuleComp";
import EmptyModule from "./components/header/EmptyModule";
import AddFoodModule from "./components/foods/AddFood/AddFoodModule";
import { User } from "./types/types";
import EatenToday from "./components/Dashboard/today/EatenToday";

function App() {
  const [updateUser, setUpdateUser] = useState<User | undefined>();

  useEffect(() => {
    console.log(` current user :  ${updateUser?.username}`);
  }, [updateUser]);

  return (
    <div
      id="app"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        padding: "10px",
        top : 0,
        fontFamily: "monospace",
        width: "100%",
      }}
    >
      <HeaderComp logOut={setUpdateUser} currentUser={updateUser}></HeaderComp>
      <Routes>
        <Route path="/" element={<EmptyModule></EmptyModule>}></Route>
        <Route
          path="/login"
          element={
            <ProfileModuleComp
              updateUserFunc={setUpdateUser}
            ></ProfileModuleComp>
          }
        ></Route>
        <Route
          path="/Dashboard"
          element={<DashboardModuleComp></DashboardModuleComp>}
        ></Route>
        <Route path="/eatentoday" element={<EatenToday></EatenToday>} ></Route>
        <Route
          path="/foodList"
          element={<FoodModuleComp></FoodModuleComp>}
        ></Route>
        <Route
          path="/addFood"
          element={<AddFoodModule></AddFoodModule>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
