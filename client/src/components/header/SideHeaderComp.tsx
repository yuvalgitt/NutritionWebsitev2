import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "../../styles/styles.css";
import { User } from "../../types/types";

interface Props {
  currentUser: User | undefined;
  logOut: React.Dispatch<React.SetStateAction<User | undefined>>
}

const HeaderComp = ({ currentUser, logOut }: Props) => {
  const navigate: NavigateFunction = useNavigate();
  return (
    <div
      className="display-component"
      style={{
        width: "15vw",
        height: "95%",
        fontSize: "100%",
        display: "flex",
        flexDirection: "column",
        marginLeft: "1%",
      }}
    >
      <h2>Dashboard</h2>
      <div className="header-submenu">
        <span onClick={() => navigate("/eatentoday")} className="header-item"> Today </span> <br />
        <span onClick={() => navigate("/dashboard")} className="header-item">
          Statistics
        </span>
      </div>
      <h2>Food</h2>
      <div className="header-submenu">
        <span onClick={() => navigate("/foodlist")} className="header-item">
          Database
        </span>{" "}
        <br />
        <span onClick={() => navigate("/addfood")} className="header-item">
          {" "}
          Add food
        </span>
      </div>
      <h2>Profile</h2>
      {!currentUser && (
        <div className="header-submenu">
          <span onClick={() => navigate("/login")} className="header-item">
            Log in
          </span>{" "}
          <br />
          <br />
          <span className="header-item">Sign up</span>
        </div>
      )}
      {currentUser && (
        <div className="header-submenu">
          {currentUser?.displayName} <br />
          <img   src={currentUser.avatarUrl} ></img> <br />
          <span className="header-item">profile settings</span>
          <br />
          <span  onClick={()=> logOut(undefined)} className="header-item">log out</span>
        </div>
      )}
    </div>
  );
};

export default HeaderComp;
