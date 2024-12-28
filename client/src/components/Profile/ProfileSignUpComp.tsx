import React, { useState } from "react";
import { User } from "../../types/types";
import axios from "axios";
import serverUrl from "../../config/config";
import { useNavigate } from "react-router-dom";

interface Props {
  updateUser : React.Dispatch<React.SetStateAction<User | undefined>>
}

const ProfileSignUpComp = ({updateUser}:Props) => {
  const [signUpObj, setSignUpObj] = useState<User>({
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    displayName: "",
    username: "",
    isAdmin: false,
    password: "",
    dateOfBirth: { year: 1900, month: 1, day: 1 },
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate =  useNavigate()

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  let day = date.getDate().toString();
  if (day.length == 1) day = `0${day}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.name;

    if (type === "dateOfBirth") {
      signUpObj.dateOfBirth.year = +e.target.value.split("-")[0];
      signUpObj.dateOfBirth.month = +e.target.value.split("-")[1];
      signUpObj.dateOfBirth.day = +e.target.value.split("-")[2];
      return;
    }

    setSignUpObj({ ...signUpObj, [type]: e.target.value });

    if (type === "avatarUrl" && e.target.value === "") {
      setSignUpObj({
        ...signUpObj,
        [type]: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${serverUrl}/users/login`, signUpObj);
      let data = response.data;
      console.log(data ? data : "incorrect details");
      if (data) {
        sessionStorage.userData = JSON.stringify(data);
        updateUser(data);
        navigate("/");
      }
    } catch {
      alert("error");
    }
  };

  const handleSubmit = async () => {
    console.log("submit", signUpObj);

    if (signUpObj.password != confirmPassword) {
      alert("passwords dont match");
      return;
    }
    try {
      let response = await axios.post(`${serverUrl}/users`, signUpObj);
      response = response.data;
      alert(response);
      handleLogin()
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="module-invisible">
      <div
        className="display-component"
        style={{
          width: "100%",
          height: "100%",
          marginTop: "-1.25%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Sign Up</h1>
        <h2>Enter details</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ width: "150px" }}>Username:</span>
            <input
              onChange={handleChange}
              name="username"
              style={{ width: "150px" }}
              type="text"
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ width: "150px" }}>Display name:</span>
            <input
              onChange={handleChange}
              name="displayName"
              style={{ width: "150px" }}
              type="text"
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ width: "150px" }}>Password:</span>
            <input
              onChange={handleChange}
              name="password"
              style={{ width: "150px" }}
              type="text"
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ width: "150px" }}>Confirm Password:</span>
            <input
              name="confirmPassword"
              style={{ width: "150px" }}
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ width: "150px" }}>Email:</span>
            <input
              onChange={handleChange}
              name="email"
              style={{ width: "150px" }}
              type="email"
            />
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ width: "150px" }}>Avatar Url:</span>
            <input
              onChange={handleChange}
              name="avatarUrl"
              style={{ width: "150px" }}
              type="text"
            />
            {/* // =========================================== D A T E */}
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <span style={{ width: "150px" }}>Date of birth:</span>
            <input
              name="dateOfBirth"
              onChange={handleChange}
              style={{ width: "150px" }}
              type="date"
              max={`${year}-${month + 1}-${day}`}
            />
          </div>
        </div>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Confirm & Sign up
        </button>
        <div
          style={{
            position: "absolute",
            zIndex: "1",
            top: "35vh",
            right: "15vw",
          }}
        >
          <div
            style={{
              borderRadius: "500px",
              width: "10vw",
              height: "20vh",
              backgroundImage: `url(${signUpObj.avatarUrl})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSignUpComp;
