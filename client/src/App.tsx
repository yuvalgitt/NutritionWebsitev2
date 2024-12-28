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
import EatenToday from "./components/today/EatenToday";
import TodayModuleComp from "./components/today/TodayModuleComp";
import ProfileSignUpComp from "./components/Profile/ProfileSignUpComp";

function App() {
  const [updateUser, setUpdateUser] = useState<User | undefined>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    console.log(` current user :  ${updateUser?.username}`);
    updateUser?.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
  }, [updateUser]);

  useEffect(() => {
    let userData;
    if (sessionStorage.userData) userData = JSON.parse(sessionStorage.userData);
    if (userData) {
      setUpdateUser(userData);
    }
  }, []);

  return (
    <div
      id="app"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        fontFamily: "monospace",
        transition: "0.2s",
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
          path="/signup"
          element={<ProfileSignUpComp  updateUser={setUpdateUser}></ProfileSignUpComp>}
        ></Route>
        <Route
          path="/Dashboard"
          element={
            <DashboardModuleComp currentUser={updateUser}></DashboardModuleComp>
          }
        ></Route>
        <Route
          path="/eatentoday"
          element={<TodayModuleComp currentUser={updateUser}></TodayModuleComp>}
        ></Route>
        <Route
          path="/foodList"
          element={<FoodModuleComp isAdmin={isAdmin}></FoodModuleComp>}
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
